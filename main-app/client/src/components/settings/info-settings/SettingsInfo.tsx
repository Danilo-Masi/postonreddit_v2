import { LinkRow, SettingsCard } from "../SettingsUtility";

const withUTM = (url: string, content: string) => {
    const u = new URL(url);
    u.searchParams.set("utm_source", content);
    u.searchParams.set("utm_medium", content);
    u.searchParams.set("utm_campaign", content);
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
                label="Send feedback"
                href="mailto:support@postonreddit.com"
            />
        </SettingsCard>
    );
}