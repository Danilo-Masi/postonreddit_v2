import { Check } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

interface PlanCardProps {
    title: string;
    titleCaption: string;
    oldPrice: number;
    newPrice: number;
    priceCaption: string;
    list: string[];
    buttonText: string;
}

export default function PlanCard({ title, titleCaption, oldPrice, newPrice, priceCaption, list, buttonText }: PlanCardProps) {
    return (
        <div className="w-full md:w-fit md:max-w-[calc(50%-10px)] h-auto md:h-full flex flex-col gap-5 p-5 rounded-lg bg-zinc-900 border border-zinc-700 shadow-2xl">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl text-zinc-100 font-bold">{title}</h1>
                <p className="text-md text-zinc-400 font-light">{titleCaption}</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-4xl text-zinc-100 font-bold"><span className="text-2xl text-zinc-400 font-semibold line-through">€{oldPrice}</span> €{newPrice}</p>
                <p className="text-sm text-zinc-400 font-light">{priceCaption}</p>
            </div>
            <Separator />
            <ul className="w-full h-full flex flex-col gap-3 text-sm text-zinc-300">
                {list.map((item) => (
                    <li className="flex  gap-2"><Check className="w-5 h-5" />{item}</li>
                ))}
            </ul>
            <Button
                className="bg-orange-600 hover:bg-orange-600/80 cursor-pointer">
                {buttonText}
            </Button>
        </div>
    )
}
