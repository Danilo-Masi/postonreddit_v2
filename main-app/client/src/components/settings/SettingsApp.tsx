import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DangerRow, SettingRow, SettingsCard } from "./SettingsUtility";
import { redditAuthorize } from "@/api/reddit/reddit-authorize";
import { useAppContext } from "@/context/AppContext";


export default function SettingsApp() {
    const { setLogoutDialogOpen, setCancelAccountDialogOpen } = useAppContext();

    // Reddit authorization function
    const handleRedditAuthorize = async () => {
        const res = await redditAuthorize();
        if (!res.ok) {
            console.log("Reddit authorization failed: ", res.error);
            alert("Reddit authorization failed");
            return;
        }
        window.location.href = res.url;
    }

    return (
        <SettingsCard title="App" description="Application preferences and account access.">
            {/* Reddit authorization */}
            <SettingRow
                title="Reddit authorization"
                description="Required to publish posts on your behalf.">
                <Button
                    onClick={handleRedditAuthorize}
                    className="w-full md:w-auto md:min-w-1/3 cursor-pointer bg-orange-600 hover:bg-orange-600/80">
                    Grant permission
                </Button>
            </SettingRow>
            {/* Theme selection */}
            <SettingRow
                title="Theme"
                description="Choose how postonreddit looks for you.">
                <Select>
                    <SelectTrigger className="w-full md:w-auto md:min-w-1/3 cursor-pointer">
                        <SelectValue placeholder="System default" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </SettingRow>
            {/* Logout */}
            <SettingRow
                title="Logout"
                description="Sign out from your account on this device.">
                <Button
                    variant="outline"
                    className="w-full md:w-auto md:min-w-1/3 cursor-pointer text-zinc-800"
                    onClick={() => setLogoutDialogOpen(true)}>
                    Logout <LogOut />
                </Button>
            </SettingRow>
            {/* Cancel account */}
            <DangerRow
                title="Cancel account"
                description="Permanently delete your account and all associated data."
                buttonLabel="Cancel account"
                onClick={() => setCancelAccountDialogOpen(true)} />
        </SettingsCard>
    )
}
