

import { FormError } from "../form-error";
import { currentRole } from "@/lib/auth";

interface RoleGateProps{
    children: React.ReactNode;
    allowedRole: "user" | "admin";
}

export const RoleGate = async ({children, allowedRole}: RoleGateProps) => {
    const role = await currentRole();

    if(!role || role !== allowedRole){
        return (
            <FormError message="You do not have permission to view this content!" />
        )
    }

    return (
        <>
            {children}
        </>
    )
}