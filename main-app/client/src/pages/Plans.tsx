import PlanCard from "@/components/plans/PlanCard";
import PlanTitle from "@/components/plans/PlanTitle";

const lifetimePlanList = [
    "Schedule unlimited post",
    "Best time to post in the next 24 hours",
    "Best time to post in the next 7 days",
    "One-click posting to multiple subreddits",
    "AI tips fro posts e subreddits target",
    "Access to future features and updates",
]

export default function Plans() {
    return (
        <div className="w-full h-auto md:h-svh overflow-scroll flex flex-col items-center justify-center gap-5 p-5 bg-zinc-800">
            <PlanTitle />
            <div className="w-full md:w-3/4 h-auto md:h-full flex flex-wrap items-center justify-center gap-5">
                <PlanCard title="Monthly plan" titleCaption="Pay less, work more" oldPrice={7} newPrice={5} priceCaption="billing monthly" list={lifetimePlanList} buttonText="Get started now" />
                <PlanCard title="Lifetime plan" titleCaption="Pay once, use forever" oldPrice={32} newPrice={59} priceCaption="just one time payment" list={lifetimePlanList} buttonText="Get lifetime access" />
            </div>
        </div>
    )
}
