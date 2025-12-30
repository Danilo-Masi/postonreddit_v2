import PlanTitle from "@/components/plans/PlanTitle";
import PlansGroup from "@/components/plans/PlansGroup";
import { useNavigate } from "react-router-dom";
import { checkoutSession } from "@/api/billing/checkout-session";

export default function Plans() {
    const navigate = useNavigate();

    const handleCheckout = async (plan: string) => {
        const checkout = await checkoutSession(plan);

        if (!checkout.ok || !checkout.checkoutUrl) {
            console.error("Failed to create checkout sessione: ", checkout.error);
            navigate("/plans", { replace: true });
            return;
        }

        window.location.href = checkout.checkoutUrl;
    }

    return (
        <div className="w-full h-auto md:h-svh overflow-scroll flex flex-col items-center justify-center gap-5 p-5 bg-zinc-800">
            <PlanTitle />
            <PlansGroup />
        </div>
    )
}
