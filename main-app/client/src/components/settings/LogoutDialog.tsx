import { useAppContext } from "@/context/AppContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { logoutFunction } from "@/api/auth/logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function LogoutDialog() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { isLogoutDialogOpen, setLogoutDialogOpen } = useAppContext();

    // Logout function
    const handleLogout = async () => {
        const res = await logoutFunction();
        if (!res.ok) {
            console.log("Logout failed: ", res.error);
            alert("Logout failed");
            return;
        }
        logout();
        navigate("/login");
    }

    return (
        <AlertDialog open={isLogoutDialogOpen} onOpenChange={() => setLogoutDialogOpen(false)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out? You will need to log in again to access your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="curosor-pointer">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-600 hover:bg-red-600/80 cursor-pointer"
                        onClick={handleLogout}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
