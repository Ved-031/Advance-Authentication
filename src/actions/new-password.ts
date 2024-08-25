"use server";
import * as z from "zod";


import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { NewPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import passwordResetTokenModel from "@/models/passwordResetToken";



export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string) => {

    const validatedFields = NewPasswordSchema.safeParse(values);
    if(!validatedFields.success){
        return { error: "All fields are required!" };
    }

    if(!token){
        return { error: "Missing token" };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    if(!existingToken){
        return { error: "Invalid token" };
    }

    const hasExpired = new Date(existingToken.expiryDate) < new Date();
    if(hasExpired){
        return { error: "Token expired" };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser){
        return { error: "Email not found" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ _id: existingUser._id }, { password: hashedPassword }, { new: true });

    await passwordResetTokenModel.findOneAndDelete({ _id: existingToken._id }, { returnOriginal: false })

    return { success: "Password updated.Please login again" };

}