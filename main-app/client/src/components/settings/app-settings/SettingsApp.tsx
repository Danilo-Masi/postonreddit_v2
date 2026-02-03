import { Lock, LockOpen, LogOut } from "lucide-react";
import { redditAuthorize } from "@/api/reddit/reddit-authorize";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DangerRow, SettingRow, SettingsCard } from "../SettingsUtility";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { redditStatus } from "@/api/reddit/reddit-status";

export default function SettingsApp() {
    const [isRedditButtonLoading, setRedditButtonLoading] = useState(false);
    const { isRedditButtonActive, setRedditButtonActive, setDismissPermissionDialogOpen, setLogoutDialogOpen, setCancelAccountDialogOpen } = useAppContext();

    //Verify Reddit authorization
    useEffect(() => {
        const checkRedditStatus = async () => {
            const res = await redditStatus();
            if (!res.ok || !res.valid) {
                setRedditButtonActive(true);
                return;
            }
            setRedditButtonActive(false);
        };
        checkRedditStatus();
    }, []);

    // Reddit authorization function
    const handleRedditAuthorize = async () => {
        if (isRedditButtonLoading) return;
        setRedditButtonLoading(true);
        try {
            const res = await redditAuthorize();
            if (!res.ok) {
                console.log("Reddit authorization failed: ", res.error);
                toast.warning("Reddit authorization failed");
                return;
            }
            window.location.href = res.url;
        } catch (error) {
            console.error("An unexpected error occurred during Reddit authorization: ", error);
            toast.error("Something went wrong");
        } finally {
            setRedditButtonLoading(false);
        }
    }

    return (
        <SettingsCard title="App" description="Application preferences and account access.">
            {/* Reddit authorization */}
            <SettingRow
                title="Reddit authorization"
                description="Required to publish posts on your behalf.">
                {isRedditButtonActive ? (
                    <Button
                        onClick={handleRedditAuthorize}
                        className="w-full md:w-auto md:min-w-1/3 cursor-pointer bg-orange-600 hover:bg-orange-600/80 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isRedditButtonLoading}>
                        {isRedditButtonLoading
                            ? (<> <Spinner />Loading</>)
                            : (<><LockOpen />Grant permission</>)
                        }
                    </Button>
                ) : (
                    <Button
                        onClick={() => setDismissPermissionDialogOpen(true)}
                        variant="destructive"
                        className="w-full md:w-auto md:min-w-1/3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isRedditButtonLoading}>
                        {isRedditButtonLoading
                            ? (<> <Spinner />Loading</>)
                            : (<><Lock />Dismiss permission</>)
                        }
                    </Button>
                )}
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
