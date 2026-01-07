import PlansGroup from "@/components/plans/PlansGroup";
import { useNavigate } from "react-router-dom";
import { checkoutSession } from "@/api/billing/checkout-session";
import { useState } from "react";

export default function Plans() {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState("lifetime");
    const [isLoading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);

        try {
            console.log("PLAN: " + selectedPlan);
            const checkout = await checkoutSession(selectedPlan);

            if (!checkout.ok || !checkout.checkoutUrl) {
                console.error("Failed to create checkout sessione: ", checkout.error);
                navigate("/login", { replace: true });
                return;
            }
            setLoading(false);
            window.location.href = checkout.checkoutUrl;
        } catch (error) {
            alert("Error during the checkout session. Plaease try again!");
            setLoading(false);
            return;
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full h-auto min-h-svh overflow-scroll flex items-center justify-center p-5 bg-zinc-800">
            <PlansGroup
                isLoading={isLoading}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                handleCheckout={handleCheckout} />
        </div>
    )
}
