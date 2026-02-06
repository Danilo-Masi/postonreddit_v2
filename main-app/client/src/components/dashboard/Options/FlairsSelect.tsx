import { getFlairs } from "@/api/reddit/reddit-flairs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

type FlairValue = {
    id: string;
    name: string;
};

export default function FlairsSelect({ subName }: { subName: string }) {
    const [isLoading, setLoading] = useState(false);
    const [flairValues, setFlairValues] = useState<FlairValue[]>([]);

    const handleFlairSelect = async () => {
        if (!subName) return;
        setLoading(true);
        const subreddit = subName.replace("r/", "").trim();
        const res = await getFlairs(subreddit);
        if (res.ok) setFlairValues(res.flairs);
        setLoading(false);
    }

    return (
        <div className="w-full h-fit max-h-auto flex flex-col gap-3">
            <h3 className="text-sm text-zinc-200">Select the flair for <span className="font-bold">{subName}</span></h3>
            <Select>
                <SelectTrigger
                    onClick={handleFlairSelect}
                    className="w-full cursor-pointer border-zinc-600 text-zinc-100">
                    <SelectValue placeholder="No flair selected" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200 cursor-pointer">
                    {isLoading && (
                        <div className="p-3 text-sm text-zinc-400">
                            Searching flairs...
                        </div>
                    )}

                    {flairValues.map((flair) => (
                        <SelectItem key={flair.id} value={flair.id}>{flair.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
