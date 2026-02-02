import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "./alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "./alert-dialog";
import { Spinner } from "./spinner";

interface ExitDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    note?: string;
    cancelText: string;
    actionText: string;
    loadingText: string;
    onAction: () => Promise<void>;
    isLoading: boolean;
}

export default function ExitDialog({ isOpen, onOpenChange, title, description, note, cancelText, actionText, loadingText, onAction, isLoading }: ExitDialogProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-zinc-800 border border-zinc-600">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-zinc-100">{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p className="text-zinc-400/80">{description}</p>
                        <p className="text-zinc-400/60 text-xs mt-2">{note}</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}>
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
