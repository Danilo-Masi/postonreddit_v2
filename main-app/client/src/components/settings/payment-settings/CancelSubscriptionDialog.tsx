import { useAppContext } from "@/context/AppContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { useAuth } from "@/context/AuthContext";

export default function CancelSubscriptionDialog() {
    const { logout } = useAuth();
    const { isCancelSubscriptionDialogOpen, setCancelSubscriptionDialogOpen } = useAppContext();

    const handleCancelSubscription = async () => {
        /*
        const res = await cancelAccountFunction();
        if (!res.ok) {
            console.error("Account cancellation failed: ", res.error);
            alert("Account cancellation failed"); // TODO: Replace with better error handling
            return;
        }
        alert("Your account has been successfully cancelled."); // TODO: Replace with better success handling
        setCancelAccountDialogOpen(false);
        logout();
        */
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
