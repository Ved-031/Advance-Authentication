"use server";
import * as z from "zod";


import { SettingsSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import User from "@/models/user";
import bcrypt from "bcryptjs";


export const settings = async (values: z.infer<typeof SettingsSchema>) => {

    const user = await currentUser();
    if(!user){
        return { error: "Unauthorized!" };
    }

    const dbUser = await getUserById(user.id);
    if(!dbUser) {
        return { error: "Unauthorized!" };
    }

    //? Checking if user is logged in usign OAuth providers
    if(user.isOAuth){
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
    }

    //** Updating email and sending verification email */
    if(values.email && values.email !== user.email){

        const existingUser = await getUserByEmail(values.email);

        if(existingUser && existingUser._id !== user.id){
            return { error: "Email already in use!" };
        }

        const verificationToken = await generateVerificationToken(values.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { success: "Verification email sent!" };
    }

    //** Updating password  */
    if(values.password && values.newPassword && dbUser.password){

        const isMatch = await bcrypt.compare(values.password, dbUser.password);
        if(!isMatch){
            return { error: "Invalid old password" };
        }

        const newHashedPassword = await bcrypt.hash(values.newPassword, 10);

        await User.findOneAndUpdate({ _id: dbUser._id }, { password: newHashedPassword }, { new: true });

        return { success: "Settings updated" };

    }

    //** Updating user with the given values on setting page */
    await User.findOneAndUpdate({ _id: dbUser._id }, { ...values }, { new: true });


    return { success: "Settings updated!" };

}