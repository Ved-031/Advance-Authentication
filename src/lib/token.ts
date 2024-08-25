import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import passwordResetTokenModel from "@/models/passwordResetToken";
import verificationTokenModel from "@/models/verificationToken";
import { v4 as uuidv4 } from "uuid";


export const generateVerificationToken = async (email: string) => {
    
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const exisitingToken = await getVerificationTokenByEmail(email);
    if(exisitingToken){
        await verificationTokenModel.findOneAndDelete({ _id: exisitingToken._id }, { returnOriginal: true });
    }

    const verificationToken = new verificationTokenModel({
        email,
        token,
        expiryDate: expires
    })
    await verificationToken.save();

    return verificationToken;
}

export const generatePasswordResetToken = async (email: string) => {

    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const exisitingToken = await getPasswordResetTokenByEmail(email);
    if(exisitingToken){
        await passwordResetTokenModel.findOneAndDelete({ _id: exisitingToken._id }, { returnOriginal: false });
    }

    const passwordResetToken = new passwordResetTokenModel({
        email,
        token,
        expiryDate: expires
    })
    await passwordResetToken.save();

    return passwordResetToken;

}

