import { TicketCheck } from "lucide-react";
import { Button } from "../ui/button";
import { DangerRow, SettingRow, SettingsCard } from "./SettingsUtility";

export default function SettingsPayment() {
    return (
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
    )
}
