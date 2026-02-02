import ExitDialog from "@/components/ui/exit-dialog";
import { useAppContext } from "@/context/AppContext"
import { useState } from "react";

export default function DismissPermissionDialog() {
    const [isLoading, setLoading] = useState(false);
    const { isDismissPermissionDialogOpen, setDismissPermissionDialogOpen } = useAppContext();

    const handleDismissPermission = async () => {
        // TODO
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
