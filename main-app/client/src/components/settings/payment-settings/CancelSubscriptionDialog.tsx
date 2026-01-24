import { cancelSubscriptionFunction } from "@/api/billing/cancel-subscription";
import ExitDialog from "@/components/ui/exit-dialog";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

export default function CancelSubscriptionDialog() {
    const { logout } = useAuth();
    const { isCancelSubscriptionDialogOpen, setCancelSubscriptionDialogOpen } = useAppContext();
    const [isLoading, setLoading] = useState(false);

    const handleCancelSubscription = async () => {
        if (isLoading) return;
        setLoading(true);
        try {
            const res = await cancelSubscriptionFunction();
            if (!res.ok) {
                console.error("Subscription cancellation failed: ", res.error);
                toast.warning("Subscription cancellation failed");
                setLoading(false);
                return;
            }
            toast.success("Your subscription has been successfully cancelled.");
            logout();
        } catch (error) {
            console.error("An unexpected error occurred during subscription cancellation: ", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ExitDialog
            isOpen={isCancelSubscriptionDialogOpen}
            onOpenChange={() => setCancelSubscriptionDialogOpen(false)}
            title="Cancel your subscription?"
            description="You’ll keep access to your plan until the end of the current billing period. After that, your subscription will not renew."
            cancelText="Keep subscription"
            actionText="Cancel subscription"
            loadingText="Loading"
            onAction={handleCancelSubscription}
            isLoading={isLoading}
        />
    )
}
