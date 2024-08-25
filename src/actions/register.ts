"use server";

import * as z from "zod";

import { getUserByEmail } from "@/data/user";
import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { RegisterSchema } from "@/schemas";
import bcryptjs from 'bcryptjs';
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";


export const register = async (values: z.infer<typeof RegisterSchema>) => {

    await connectDB();

    const validatedFields = RegisterSchema.safeParse(values);
    
    if(!validatedFields.success){
        return { error: 'All fields are required' };
    }

    const { name, email, password } = validatedFields.data;

    const existsUser = await getUserByEmail(email);
    if(existsUser){
        return { error: 'Email already in use!. Please try with another email' };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        isOAuth: false,
    })
    await newUser.save();

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: 'Confirmation email sent!' };

}