import { ArrowRight, CircleCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const plansItems = [
  "Schedule unlimited posts",
  "Best time to post over the next 7 days",
  "One-click posting to multiple subreddits",
  "AI tips for posts & subreddit targeting",
  "Access to all future features and updates"
];

type RadioGroupTypes = {
  title: string,
  price: number,
  oldPrice: number,
  subtitle: string,
  items: String[],
  selectedPlan: string;
  onSelect: () => void;
}

const RadioGroup = ({ title, price, oldPrice, subtitle, items, selectedPlan, onSelect }: RadioGroupTypes) => {

  const isSelected = selectedPlan.toLowerCase() === title.toLowerCase();

  return (
    <div
      onClick={onSelect}
      className={`w-full h-min p-5 rounded-md border flex flex-wrap items-start justify-start gap-5 md:gap-0 cursor-pointer ${isSelected ? 'border-2 border-orange-400 bg-linear-to-tr from-zinc-900 to-orange-900' : 'border border-zinc-500'}`}>
      <div className="w-[calc(50%-10px)] md:w-1/2 flex items-start justify-start gap-3">
        <div className={`w-5 h-5 rounded-full ${isSelected ? 'bg-orange-400' : 'bg-zinc-300'}`} />
        <h1 className={`text-md font-medium ${isSelected ? 'text-zinc-50' : 'text-zinc-300'}`}>{title}</h1>
      </div>
      <div className="w-[calc(50%-10px)] md:w-1/2 flex flex-col items-end justify-start">
        <h3 className="text-2xl font-bold text-zinc-100">€{price}<span className="text-lg font-light text-zinc-400/70 line-through ml-2">€{oldPrice}</span></h3>
        <p className="text-sm text-zinc-400/70">{subtitle}</p>
      </div>
      <ul className={`w-full flex-col gap-5 md:pt-5 text-zinc-200 ${isSelected ? 'flex' : 'hidden'}`}>
        {items.map((item) => (
          <li className="flex items-start gap-2 text-sm"><CircleCheck className={`w-5 h-5 ${isSelected && 'text-orange-400'}`} />{item}</li>
        ))}
      </ul>
      {isSelected && (
        <Button className="w-full mt-5 bg-orange-400 hover:bg-orange-500 cursor-pointer">
          Continue <ArrowRight />
        </Button>
      )}
    </div>
  );
}

export default function PlansGroup() {
  const [selectedPlan, setSelectedPlan] = useState("lifetime");

  return (
    <div className="w-full md:w-1/3 h-auto flex flex-col items-start justify-center gap-5 p-5 rounded-xl bg-zinc-700">

      <h1 className="text-xl font-bold text-zinc-100">Select a plan</h1>

      <RadioGroup
        title="Monthly"
        price={7.99}
        oldPrice={8.99}
        subtitle="added monthly"
        items={plansItems}
        selectedPlan={selectedPlan}
        onSelect={() => setSelectedPlan("monthly")} />

      <RadioGroup
        title="Lifetime"
        price={65}
        oldPrice={95}
        subtitle="one-time payment"
        items={plansItems}
        selectedPlan={selectedPlan}
        onSelect={() => setSelectedPlan("lifetime")} />

    </div>
  )
}
