import verificationTokenModel from "@/models/verificationToken";


export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await verificationTokenModel.findOne({ email });
        return verificationToken;
    } catch (error) {
        return null;
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await verificationTokenModel.findOne({ token });
        return verificationToken;
    } catch (error) {
        return null;
    }
}