"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import User from "@/models/user";
import verificationTokenModel from "@/models/verificationToken";

export const newVerification = async (token: string) => {

    const existingToken = await getVerificationTokenByToken(token);
    if(!existingToken){
        return { error: "Token does not exists" };
    }

    const hasExpired = new Date(existingToken.expiryDate) < new Date();
    if(hasExpired){
        return { error: "Token has expired" };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser){
        return { error: "Email does not exist" };
    }

    const updatedUser = await User.findOneAndUpdate({ email: existingUser.email }, { emailVerified: new Date(), 
    email: existingUser.email 
    }, { new: true });

    await verificationTokenModel.findOneAndDelete({ email: existingToken.email }, { returnOriginal: false })

    return { success: "Email verified!.Please login" };

}

