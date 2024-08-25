import mongoose from "mongoose";

const verificationTokenSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    token: {
        type: String,
        unique: true,
    },
    expiryDate: {
        type: Date
    }
})

const verificationTokenModel = mongoose.models?.verificationToken || mongoose.model('verificationToken', verificationTokenSchema);

export default verificationTokenModel;