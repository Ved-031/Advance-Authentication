import mongoose from "mongoose";

const passwordResetTokenSchema = new mongoose.Schema({
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

const passwordResetTokenModel = mongoose.models.resetPasswordToken || mongoose.model('resetPasswordToken', passwordResetTokenSchema);

export default passwordResetTokenModel;