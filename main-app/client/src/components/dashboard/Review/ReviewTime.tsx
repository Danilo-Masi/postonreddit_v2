import { Input } from "@/components/ui/input";

export default function ReviewTime({ subreddit }: { subreddit: string }) {
    return (
        <div className="w-full flex justify-between items-center mb-5">
            <p className="text-zinc-200 font-medium text-sm">{subreddit}</p>
            <Input
                type="time"
                id="time-picker"
                step={900}
                defaultValue="10:30"
                className="w-fit bg-zinc-800 border-zinc-700 text-zinc-200 appearance-none 
            [&::-webkit-calendar-picker-indicator]:hidden 
            [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
        </div>
    )
}
