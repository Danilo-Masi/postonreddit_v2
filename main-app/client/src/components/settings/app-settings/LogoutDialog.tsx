import { useAppContext } from "@/context/AppContext";
import { logoutFunction } from "@/api/auth/logout";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";
import ExitDialog from "@/components/ui/exit-dialog";

export default function LogoutDialog() {
    const { logout } = useAuth();
    const { isLogoutDialogOpen, setLogoutDialogOpen } = useAppContext();
    const [isLoading, setLoading] = useState(false);

    const handleLogout = async () => {
        if (isLoading) return;
        setLoading(true);
        try {
            const res = await logoutFunction();
            if (!res.ok) {
                console.error("Logout failed: ", res.error);
                toast.warning("Logout failed");
                return;
            }
            logout();
        } catch (error) {
            console.error("An unexpected error occurred during logout: ", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ExitDialog
            isOpen={isLogoutDialogOpen}
            onOpenChange={() => setLogoutDialogOpen(false)}
            title="Confirm logout"
            description="Once logged out, you’ll need to sign in again to access your account."
            cancelText="Cancel"
            actionText="Confirm logout"
            loadingText="Loading"
            onAction={handleLogout}
            isLoading={isLoading}
        />
    )
}
