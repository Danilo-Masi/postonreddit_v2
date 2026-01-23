import { cancelSubscriptionFunction } from "@/api/billing/cancel-subscription";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

export default function CancelSubscriptionDialog() {
    const { logout } = useAuth();
    const { isCancelSubscriptionDialogOpen, setCancelSubscriptionDialogOpen } = useAppContext();

    const handleCancelSubscription = async () => {
        const res = await cancelSubscriptionFunction();
        if (!res.ok) {
            console.error("Subscription cancellation failed: ", res.error);
            alert("Subscription cancellation failed"); // TODO: Replace with better error handling
            return;
        }
        alert("Your subscription has been successfully cancelled."); // TODO: Replace with better success handling
        setCancelSubscriptionDialogOpen(false);
        logout();
    }

    return (
        <AlertDialog open={isCancelSubscriptionDialogOpen} onOpenChange={() => setCancelSubscriptionDialogOpen(false)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to cancel your subscription? This action is irreversible and will delete all your subscription data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="curosor-pointer">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-600 hover:bg-red-600/80 cursor-pointer"
                        onClick={handleCancelSubscription}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
