import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useAppContext } from "@/context/AppContext";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { deletePostFunction } from "@/api/post/delete-post";

interface AlertDeletePostInterface {
    isAlertDeleteOpen: boolean;
    setAlertDeleteOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AlertDeletePost({ isAlertDeleteOpen, setAlertDeleteOpen }: AlertDeletePostInterface) {
    const [isLoading, setLoading] = useState(false);
    const { postIdSelected } = useAppContext();

    const handleDeletePost = async () => {
        setLoading(true);
        try {
            const res = await deletePostFunction(postIdSelected);
            if (!res.ok) {
                toast.error("Server error. Please try again later.");
                console.error("Response error: " + res.error);
            }
            toast.success("Post deleted successfully!");
        } catch (error) {
            toast.error("Server error. Please try again later.");
            console.error("Server unenxpected error: " + { error });
        } finally {
            setLoading(false);
        }
    }

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
                        onClick={handleDeletePost}
                        disabled={isLoading}
                        className="cursor-pointer bg-red-600 hover:bg-red-600/70">
                        {isLoading ? (<><Spinner />Deleting</>) : (<>Delete</>)}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
