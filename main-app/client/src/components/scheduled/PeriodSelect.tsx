import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Dispatch, SetStateAction } from "react";

interface PeriodSelectInterface {
    periodValue: string;
    setPeriodValue: Dispatch<SetStateAction<string>>;
}

export default function PeriodSelect({ periodValue, setPeriodValue }: PeriodSelectInterface) {

    const handleValueChange = (value: string) => {
        setPeriodValue(value);
    }

    return (
        <Select
            value={periodValue}
            onValueChange={handleValueChange}>
            <SelectTrigger className="w-full md:w-1/3 border border-zinc-300 text-zinc-100">
                <SelectValue placeholder="Select a period" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Next week</SelectItem>
                <SelectItem value="month">Next month</SelectItem>
                <SelectItem value="all">All</SelectItem>
            </SelectContent>
        </Select>
    )
}