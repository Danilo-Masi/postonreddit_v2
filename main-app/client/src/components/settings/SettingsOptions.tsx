import { Separator } from "../ui/separator";
import LogoutButton from "./LogoutButton";
import OptionContainer from "./OptionContainer";
import RedditPermissionsButton from "./RedditPermissionsButton";
import SelectTimeFormat from "./SelectTimeFormat";
import SelectTimezone from "./SelectTimezone";

export default function SettingsOptions() {
    return (
        <div className="w-full md:w-1/2 h-fit md:h-full mb-10 md:mb-0 px-0 md:px-5 py-5 md:py-0">
            <h1 className="font-bold text-xl text-zinc-200">Profile settings</h1>
            <p className="font-medium text-sm text-zinc-400 mt-1">Manage your profile preferences</p>
            <Separator className="mt-3" />
            <div className="w-full max-h-full md:max-h-[85svh] mt-5 overflow-scroll">
                <OptionContainer label="Select a time zone">
                    <SelectTimezone />
                </OptionContainer>
                <OptionContainer label="Select a time format">
                    <SelectTimeFormat />
                </OptionContainer>
                <OptionContainer label="Consent Reddit permissions">
                    <RedditPermissionsButton />
                </OptionContainer>
                <OptionContainer label="Exit to your profile">
                    <LogoutButton />
                </OptionContainer>
            </div>
        </div>
    )
}
