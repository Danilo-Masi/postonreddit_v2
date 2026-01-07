import { ArrowRight, CircleCheck } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const plansItems = [
  "Schedule unlimited posts",
  "Best time to post over the next 7 days",
  "One-click posting to multiple subreddits",
  "AI tips for posts & subreddit targeting",
  "Access to all future features and updates"
];

type RadioGroupTypes = {
  isLoading: boolean,
  title: string,
  price: number,
  oldPrice: number,
  subtitle: string,
  items: String[],
  selectedPlan: string;
  onSelect: () => void;
  onClick: () => void;
}

const RadioGroup = ({ isLoading, title, price, oldPrice, subtitle, items, selectedPlan, onSelect, onClick }: RadioGroupTypes) => {

  const isSelected = selectedPlan.toLowerCase() === title.toLowerCase();

  return (
    <div
      onClick={onSelect}
      className={`w-full h-min p-5 rounded-md flex flex-wrap items-start justify-start gap-5 md:gap-0 cursor-pointer border relative ${isSelected ? 'bg-linear-to-tr from-zinc-800 to-zinc-700 border-zinc-100 ' : 'border border-zinc-500'}`}>
      <div className="w-[calc(50%-10px)] md:w-1/2 flex items-start justify-start gap-3">
        <div className={`w-5 h-5 rounded-full ${isSelected ? 'bg-zinc-100' : 'bg-zinc-500'}`} />
        <h1 className={`text-md font-medium ${isSelected ? 'text-zinc-50' : 'text-zinc-400'}`}>{title}</h1>
      </div>
      <div className="w-[calc(50%-10px)] md:w-1/2 flex flex-col items-end justify-start">
        <h3 className="text-2xl font-bold text-zinc-100">€{price}<span className="text-lg font-light text-zinc-400/70 line-through ml-2">€{oldPrice}</span></h3>
        <p className="text-sm text-zinc-400/70">{subtitle}</p>
      </div>
      <ul className={`w-full flex-col gap-5 md:pt-5 text-zinc-200 transition-all duration-1000 ${isSelected ? 'flex' : 'hidden'}`}>
        {items.map((item) => (
          <li className="flex items-start gap-2 text-sm"><CircleCheck className={`w-5 h-5 ${isSelected && 'text-orange-100'}`} />{item}</li>
        ))}
      </ul>
      {isSelected && (
        <Button
          onClick={onClick}
          className="w-full mt-5 bg-orange-600 hover:bg-orange-600/80 cursor-pointer">
          {isLoading ? (
            <><Spinner /> Loading</>
          ) : (
            <>Continue < ArrowRight /></>
          )}
        </Button>
      )}
    </div>
  );
}

interface PlansGroupInterface {
  isLoading: boolean;
  selectedPlan: string;
  setSelectedPlan: Dispatch<SetStateAction<string>>;
  handleCheckout: () => void;
}

export default function PlansGroup({ isLoading, selectedPlan, setSelectedPlan, handleCheckout }: PlansGroupInterface) {
  return (
    <div className="w-full md:w-1/3 h-auto flex flex-col items-start justify-center gap-5 p-5 rounded-xl bg-zinc-700">

      <h1 className="text-xl font-bold text-zinc-100">Select a plan</h1>

      <RadioGroup
        isLoading={isLoading}
        title="Monthly"
        price={7.99}
        oldPrice={8.99}
        subtitle="billed monthly"
        items={plansItems}
        selectedPlan={selectedPlan}
        onSelect={() => setSelectedPlan("monthly")}
        onClick={handleCheckout} />

      <RadioGroup
        isLoading={isLoading}
        title="Lifetime"
        price={65}
        oldPrice={95}
        subtitle="No renewals"
        items={plansItems}
        selectedPlan={selectedPlan}
        onSelect={() => setSelectedPlan("lifetime")}
        onClick={handleCheckout} />

    </div>
  )
}
