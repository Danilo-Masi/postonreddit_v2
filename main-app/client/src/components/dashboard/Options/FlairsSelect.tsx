import { getFlairs } from "@/api/reddit/reddit-flairs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

type FlairValue = {
    id: string;
    name: string;
};

export default function FlairsSelect({ subName }: { subName: string }) {
    const [isLoading, setLoading] = useState(false);
    const [flairValues, setFlairValues] = useState<FlairValue[]>([]);
    const { subredditTargets, setSubredditTargets } = useAppContext();

    // Flair attualmente selezionata per questa subreddit
    const selectedFlair = subredditTargets.find((t) => t.subreddit === subName)?.flairId;

    // Quando apri il select, fetcha le flair se non le abbiamo già
    const handleFlairFetch = async () => {
        if (!subName) return;

        setLoading(true);
        const subreddit = subName.replace("r/", "").trim();
        const res = await getFlairs(subreddit);

        if (res.ok) setFlairValues(res.flairs);
        setLoading(false);
    };

    // Quando selezioni una flair
    const handleFlairChange = (flairId: string) => {
        const selected = flairValues.find((f) => f.id === flairId);
        if (!selected) return;

        setSubredditTargets((prev) =>
            prev.map((target) =>
                target.subreddit === subName
                    ? {
                        ...target,
                        flairId: selected.id,
                        flairName: selected.name,
                    }
                    : target
            )
        );
    };

    return (
        <div className="w-full flex flex-col gap-3">
            <h3 className="text-sm text-zinc-200">
                Select the flair for <span className="font-bold">{subName}</span>
            </h3>

            <Select
                value={selectedFlair ?? ""}
                onValueChange={handleFlairChange}
                onOpenChange={(open) => {
                    if (open && flairValues.length === 0) handleFlairFetch();
                }}>
                <SelectTrigger className="w-full cursor-pointer border-zinc-600 text-zinc-100">
                    <SelectValue placeholder="No flair selected" />
                </SelectTrigger>

                <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200 cursor-pointer">
                    {isLoading && (
                        <div className="p-3 text-sm text-zinc-400">
                            Searching flairs...
                        </div>
                    )}

                    {!isLoading && flairValues.length === 0 && (
                        <div className="p-3 text-sm text-zinc-400">
                            No flair available or access denied
                        </div>
                    )}

                    {!isLoading &&
                        flairValues.map((flair) => (
                            <SelectItem key={flair.id} value={flair.id}>
                                {flair.name}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    );
}