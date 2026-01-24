import { useAppContext } from "@/context/AppContext";
import { cancelAccountFunction } from "@/api/auth/cancel-account";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";
import ExitDialog from "@/components/ui/exit-dialog";

export default function CancelAccountDialog() {
    const { logout } = useAuth();
    const { isCancelAccountDialogOpen, setCancelAccountDialogOpen } = useAppContext();
    const [isLoading, setLoading] = useState(false);

    const handleCancelAccount = async () => {
        if (isLoading) return;
        setLoading(true);
        try {
            const res = await cancelAccountFunction();
            if (!res.ok) {
                console.error("Account cancellation failed: ", res.error);
                toast.warning("Account cancellation failed");
                return;
            }
            toast.success("Your account has been successfully cancelled.");
            logout();
        } catch (error) {
            console.error("An unexpected error occurred during account cancellation: ", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ExitDialog
            isOpen={isCancelAccountDialogOpen}
            onOpenChange={() => setCancelAccountDialogOpen(false)}
            title="Delete your account?"
            description="This action is permanent. Your account and all associated data will be permanently deleted and cannot be recovered."
            cancelText="Keep account"
            actionText="Delete account"
            loadingText="Loading"
            onAction={handleCancelAccount}
            isLoading={isLoading}
        />
    )
}
