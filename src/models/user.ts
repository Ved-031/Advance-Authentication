import mongoose, { Schema } from "mongoose";

export enum UserRole {
    USER = "user",
    ADMIN = "admin"
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    emailVerified: {
        type: Date,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    image: {
        type: String,
        default: null,
    },
    isOAuth: {
        type: Boolean,
    }
});

const User = mongoose.models?.User || mongoose.model('User', userSchema);

export default User;
