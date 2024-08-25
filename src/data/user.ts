import User from "@/models/user";

export const getUserByEmail = async (email: string | null | undefined) => {
    try {
        const user = await User.findOne({ email }); 
        return user;
    } catch (error) {
        return null;
    }
}

export const getUserById = async (id: string | undefined) => {
    try {
        const user = await User.findOne({ _id: id }); 
        return user;
    } catch (error) {
        return null;
    }
}