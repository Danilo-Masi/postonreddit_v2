import { LinkRow, SettingsCard } from "../SettingsUtility";

const withUTM = (url: string, content: string) => {
    const u = new URL(url);
    u.searchParams.set("utm_source", "app");
    u.searchParams.set("utm_medium", "settings");
    u.searchParams.set("utm_campaign", "app_info");
    u.searchParams.set("utm_content", content);
    return u.toString();
};

export default function SettingsInfo() {
    return (
        <SettingsCard title="App info" description="Legal information and feedback.">
            <LinkRow
                label="Website"
                href={withUTM("https://postonreddit.com", "website")}
            />
            <LinkRow
                label="Privacy policy"
                href={withUTM("https://postonreddit.com/privacy", "privacy")}
            />
            <LinkRow
                label="Terms of use"
                href={withUTM("https://postonreddit.com/terms", "terms")}
            />
            <LinkRow
                label="Rate this app"
                href={withUTM("https://example.com/review", "rate_app")}
            />
            <LinkRow
                label="Send feedback"
                href="mailto:support@postonreddit.com"
            />
        </SettingsCard>
    );
}