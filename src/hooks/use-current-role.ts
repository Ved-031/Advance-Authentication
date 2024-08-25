
import { useSession } from "next-auth/react";


export const useCurrentRole = async () => {
    const session = useSession();
    
    return session.data?.user?.role as "user" | "admin";
}