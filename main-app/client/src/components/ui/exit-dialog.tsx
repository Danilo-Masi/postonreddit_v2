import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "./alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "./alert-dialog";
import { Spinner } from "./spinner";

interface ExitDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    cancelText: string;
    actionText: string;
    loadingText: string;
    onAction: () => Promise<void>;
    isLoading: boolean;
}

export default function ExitDialog({ isOpen, onOpenChange, title, description, cancelText, actionText, loadingText, onAction, isLoading }: ExitDialogProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-600 hover:bg-red-600/80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={onAction}
                        disabled={isLoading}>
                        {isLoading
                            ? (<><Spinner /> {loadingText}</>)
                            : (actionText)
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
