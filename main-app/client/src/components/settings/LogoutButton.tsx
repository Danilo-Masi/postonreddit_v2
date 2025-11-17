import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function LogoutButton() {
    return (
        <Button
            variant="destructive"
            className="w-full md:w-1/2">
                <LogOut /> Logout
        </Button>
    )
}
