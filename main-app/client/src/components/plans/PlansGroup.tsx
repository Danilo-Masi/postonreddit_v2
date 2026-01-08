import { type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const monthlySubtitle = "Flexible monthly subscription. Cancel anytime and access all features without long-term commitment.";
const lifetimeSubtitle = "One-time payment for lifetime access. No renewals, no recurring fees, all future updates included.";

type RadioGroupTypes = {
  title: string,
  price: string,
  subtitle: string,
  selectedPlan: string;
  onSelect: () => void;
}

const RadioGroup = ({ title, price, subtitle, selectedPlan, onSelect }: RadioGroupTypes) => {

  const isSelected = selectedPlan.toLowerCase() === title.toLowerCase();

  const [amount, period] = price.split("/");

  return (
    <div className={`w-full h-auto rounded-xl flex flex-wrap gap-y-3 p-5 border border-zinc-300 cursor-pointer transition-all duration-500 ${isSelected ? 'opacity-100' : 'opacity-35'}`}>
      {/* Titolo e prezzo */}
      <div className="w-1/2 flex flex-col gap-2">
        <h1 className="font-bold text-xl md:text-lg text-zinc-100">{title}</h1>
        <h3 className="font-bold text-2xl md:text-xl text-zinc-100">€{amount}<span className="font-medium text-sm text-zinc-400">/ {period}</span></h3>
      </div>
      {/* Selezionatore */}
      <div
        onClick={onSelect}
        className="w-1/2 flex justify-end items-start gap-3">
        {title.toLowerCase() === "lifetime" &&
          <h1 className="text-sm font-bold text-zinc-100 bg-orange-500 h-min px-3 py-1 rounded-3xl">Best price</h1>
        }
        <div className={`w-5 h-5 rounded-full cursor-pointer ${isSelected ? 'bg-zinc-100' : 'bg-zinc-800'}`} />
      </div>
      {/* Sottotitolo*/}
      <div className="w-full">
        <p className="text-md md:text-sm font-light text-zinc-300">{subtitle}</p>
      </div>
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

  const price = selectedPlan.toLowerCase() === "monthly" ? "7.99" : "65";
  const billing = selectedPlan.toLowerCase() === "monthly" ? "monthly" : "one-time";

  return (
    <div className="w-full md:w-1/3 h-auto flex flex-col items-start justify-center gap-5 rounded-lg">
      {/* Title */}
      <h1 className="font-bold text-xl text-zinc-100">Pick your plan</h1>
      {/* Monthly plan */}
      <RadioGroup
        title="Monthly"
        price="7.99 / monthly"
        subtitle={monthlySubtitle}
        selectedPlan={selectedPlan}
        onSelect={() => setSelectedPlan("monthly")} />
      {/* Lifetime plan */}
      <RadioGroup
        title="Lifetime"
        price="65 / one-time"
        subtitle={lifetimeSubtitle}
        selectedPlan={selectedPlan}
        onSelect={() => setSelectedPlan("lifetime")} />
      {/* Bottone di conferma */}
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        aria-busy={isLoading}
        className="w-full py-6 md:py-5 flex items-center justify-center gap-3 text-base font-medium cursor-pointer bg-orange-600 hover:bg-orange-600/80 transition-all disabled:cursor-not-allowed disabled:opacity-70">
        {isLoading ? (
          <>
            <Spinner className="w-5 h-5 animate-spin" />
            <span>Redirecting to checkout…</span>
          </>
        ) : (
          <>
            <span>
              Pay <strong>€{price}</strong>
              <span className="ml-1 text-sm font-light opacity-80">
                / {billing}
              </span>
            </span>
          </>
        )}
      </Button>
      <p className="w-full flex items-center justify-center text-xs text-zinc-400 text-center">
        Secure checkout • Cancel anytime
      </p>
    </div>
  )
}
