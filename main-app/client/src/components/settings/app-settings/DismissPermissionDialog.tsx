import { redditDisconnectFunction } from "@/api/reddit/reddit-disconnect";
import ExitDialog from "@/components/ui/exit-dialog";
import { useAppContext } from "@/context/AppContext"
import { useState } from "react";
import { toast } from "sonner";

export default function DismissPermissionDialog() {
    const [isLoading, setLoading] = useState(false);
    const { setRedditButtonActive, isDismissPermissionDialogOpen, setDismissPermissionDialogOpen } = useAppContext();

    const handleDismissPermission = async () => {
        if (isLoading) return;
        setLoading(true);

        try {
            const res = await redditDisconnectFunction();

            if (!res.ok) {
                console.error("Reddit disconnect failed: ", res.error);
                toast.warning("Unable to disconnect Reddit. Please try again.");
                return;
            }
            toast.success("Reddit has been disconnected successfully.");
            setRedditButtonActive(true);
        } catch (error) {
            console.error("Unexpected error during disconnect: ", error);
            toast.error("Network erorr. Please check your connection.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ExitDialog
            isOpen={isDismissPermissionDialogOpen}
            onOpenChange={() => setDismissPermissionDialogOpen(false)}
            title="Revoke Reddit access?"
            description="You are about to remove PostonReddit's authorization to access your Reddit account."
            note="* This will delete the tokens from our database, but to completely revoke access, you must go to your Reddit preferences."
            cancelText="Keep authorization"
            actionText="Revoke access"
            loadingText="Revoking..."
            onAction={handleDismissPermission}
            isLoading={isLoading}
        />
    )
}
