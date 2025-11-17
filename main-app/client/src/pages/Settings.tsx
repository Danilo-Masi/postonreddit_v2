import Layout from "../components/layout/Layout";
import SettingsChangelog from "../components/settings/SettingsChangelog";
import SettingsOptions from "../components/settings/SettingsOptions";

export default function Settings() {
    return (
        <Layout>
            <SettingsOptions />
            <SettingsChangelog />
        </Layout>
    )
}
