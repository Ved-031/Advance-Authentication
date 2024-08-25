import passwordResetTokenModel from "@/models/passwordResetToken"


export const getPasswordResetTokenByEmail = async (email: string) => {

    try {
        const passwordResetToken = await passwordResetTokenModel.findOne({ email });
        return passwordResetToken;
    } catch (error) {
        return null;
    }
    
}

export const getPasswordResetTokenByToken = async (token: string) => {

    try {
        const passwordResetToken = await passwordResetTokenModel.findOne({ token });
        return passwordResetToken;
    } catch (error) {
        return null;
    }
    
}