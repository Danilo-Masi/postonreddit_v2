import Layout from "../components/layout/Layout";
import SettingsContainer from "@/components/settings/SettingsContainer";
import CancelAccountDialog from "@/components/settings/app-settings/CancelAccountDialog";
import LogoutDialog from "@/components/settings/app-settings/LogoutDialog";
import CancelSubscriptionDialog from "@/components/settings/payment-settings/CancelSubscriptionDialog";

export default function Settings() {
    return (
        <Layout>
            <SettingsContainer />
            <LogoutDialog />
            <CancelAccountDialog />
            <CancelSubscriptionDialog />
        </Layout>
    );
}
