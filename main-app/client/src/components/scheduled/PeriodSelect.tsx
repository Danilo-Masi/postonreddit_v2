import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PeriodSelect() {
    return (
        <Select>
            <SelectTrigger className="w-full md:w-1/3 border border-zinc-300 placeholder:text-zinc-400 text-zinc-100">
                <SelectValue placeholder="Select a period" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="next-week">Next week</SelectItem>
                <SelectItem value="next-month">Next month</SelectItem>
                <SelectItem value="all">All</SelectItem>
            </SelectContent>
        </Select>
    )
}
