import SettingsApp from "./app-settings/SettingsApp";
import SettingsInfo from "./info-settings/SettingsInfo";
import SettingsPayment from "./payment-settings/SettingsPayment";

export default function SettingsContainer() {
    return (
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-zinc-100">
            {/* PAGE TITLE */}
            <div>
                <h1 className="text-xl font-semibold">Settings</h1>
                <p className="text-sm text-zinc-400">
                    Manage your account, preferences and billing.
                </p>
            </div>
            {/* SETTINGS SECTIONS */}
            <SettingsApp />
            <SettingsPayment />
            <SettingsInfo />
        </div>
    );
}
