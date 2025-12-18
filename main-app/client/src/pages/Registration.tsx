import LayoutOuth from "@/components/outh/LayoutOuth";
import LogoOuth from "@/components/outh/LogoOuth";
import RegistrationOuth from "@/components/outh/RegistrationOuth";
import LinksOuth from "@/components/outh/LinksOuth";

export default function Registration() {

    const searchParams = new URLSearchParams(location.search);
    const plan = searchParams.get("plan");

    return (
        <LayoutOuth>
            <LogoOuth />
            <RegistrationOuth plan={plan} />
            <LinksOuth />
        </LayoutOuth>
    )
}
