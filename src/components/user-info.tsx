import { ExtendedUser } from "@/types";
import { 
    Card, 
    CardContent, 
    CardHeader 
} from "@/components/ui/card";


interface UserInfoProps{
    user?: ExtendedUser;
    label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        ID
                    </p>
                    <p className="truncate text-xs max-w-[100px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.id}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Name
                    </p>
                    <p className="truncate text-xs max-w-[100px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Email
                    </p>
                    <p className="truncate text-xs max-w-[100px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Role
                    </p>
                    <p className="truncate text-xs max-w-[100px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.role}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}