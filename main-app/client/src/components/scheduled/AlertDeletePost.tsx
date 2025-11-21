import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import type { Dispatch, SetStateAction } from "react"

export default function AlertDeletePost({ isAlertDeleteOpen, setAlertDeleteOpen }: { isAlertDeleteOpen: boolean, setAlertDeleteOpen: Dispatch<SetStateAction<boolean>> }) {
    return (
        <AlertDialog open={isAlertDeleteOpen} onOpenChange={() => setAlertDeleteOpen(!isAlertDeleteOpen)}>
            <AlertDialogContent className="bg-zinc-900 border-zinc-700">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-zinc-100">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-400">
                        This action cannot be undone. This will permanently delete your post
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="cursor-pointer bg-red-600 hover:bg-red-600/70">
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
