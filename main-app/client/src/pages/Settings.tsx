import Layout from "../components/layout/Layout";
import SettingsContainer from "@/components/settings/SettingsContainer";
import LogoutDialog from "@/components/settings/LogoutDialog";
import CancelAccountDialog from "@/components/settings/CancelAccountDialog";

export default function Settings() {
    return (
        <Layout>
            <SettingsContainer />
            <LogoutDialog />
            <CancelAccountDialog />
        </Layout>
    );
}
