import { ArrowRight, LogOut, TicketCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { logoutFunction } from "@/api/auth/logout";

function SettingsCard({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
    return (
        <div className="rounded-md bg-zinc-800 border border-zinc-700 p-4 flex flex-col gap-5">
            <div className="mb-3">
                <h2 className="text-md font-bold">{title}</h2>
                <p className="text-sm text-zinc-400">{description}</p>
            </div>
            {children}
        </div>
    );
}

function SettingRow({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="max-w-md">
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-zinc-400">{description}</p>
            </div>
            {children}
        </div>
    );
}

function DangerRow({ title, description, buttonLabel }: { title: string, description: string, buttonLabel: string }) {
    return (
        <div className="mt-2 rounded-md border border-red-500/30 bg-red-500/5 p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
                <p className="text-sm font-medium text-red-400">{title}</p>
                <p className="text-xs text-red-400/80">{description}</p>
            </div>
            <Button
                variant="destructive"
                className="w-full md:w-auto cursor-pointer">
                {buttonLabel}
            </Button>
        </div>
    );
}

function LinkRow({ label, href }: { label: string, href: string }) {
    return (
        <a
            href={href}
            className="flex items-center justify-between text-sm hover:underline text-zinc-300"
            target={href.startsWith("https") ? "_blank" : undefined}>
            {label}
            <span className="text-zinc-500"><ArrowRight size={16} /></span>
        </a>
    );
}

export default function AppSettings() {
    const navigate = useNavigate();
    const { logout } = useAuth();

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
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-zinc-100">

            {/* PAGE TITLE */}
            <div>
                <h1 className="text-xl font-semibold">Settings</h1>
                <p className="text-sm text-zinc-400">
                    Manage your account, preferences and billing.
                </p>
            </div>

            {/* APP */}
            <SettingsCard title="App" description="Application preferences and account access.">
                {/* Reddit authorization */}
                <SettingRow
                    title="Reddit authorization"
                    description="Required to publish posts on your behalf.">
                    <Button
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
                        onClick={handleLogout}>
                        Logout <LogOut />
                    </Button>
                </SettingRow>
                {/* Cancel account */}
                <DangerRow
                    title="Cancel account"
                    description="Permanently delete your account and all associated data."
                    buttonLabel="Cancel account" />
            </SettingsCard>

            {/* PAYMENT */}
            <SettingsCard title="Payment" description="Billing and subscription management.">
                {/* Invoices */}
                <SettingRow
                    title="Invoices"
                    description="View and download your past invoices.">
                    <Button
                        variant="outline"
                        className="w-full md:w-auto md:min-w-1/3 cursor-pointer text-zinc-800">
                        View invoices <TicketCheck />
                    </Button>
                </SettingRow>
                {/* Cancel subscription */}
                <DangerRow
                    title="Cancel subscription"
                    description="Your subscription will remain active until the end of the billing period."
                    buttonLabel="Cancel subscription" />
            </SettingsCard>

            {/* APP INFO */}
            <SettingsCard title="App info" description="Legal information and feedback.">
                <LinkRow label="Website" href="https://postonreddit.com" />
                <LinkRow label="Privacy policy" href="/privacy" />
                <LinkRow label="Terms of use" href="/terms" />
                <LinkRow label="Rate this app" href="https://example.com/review" />
                <LinkRow label="Send feedback" href="mailto:support@postonreddit.com" />
            </SettingsCard>
        </div>
    );
}
