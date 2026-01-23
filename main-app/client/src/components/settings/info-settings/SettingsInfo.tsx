import { LinkRow, SettingsCard } from "../SettingsUtility";

export default function SettingsInfo() {
    return (
        <SettingsCard title="App info" description="Legal information and feedback.">
            <LinkRow label="Website" href="https://postonreddit.com" />
            <LinkRow label="Privacy policy" href="/privacy" />
            <LinkRow label="Terms of use" href="/terms" />
            <LinkRow label="Rate this app" href="https://example.com/review" />
            <LinkRow label="Send feedback" href="mailto:support@postonreddit.com" />
        </SettingsCard>
    )
}
