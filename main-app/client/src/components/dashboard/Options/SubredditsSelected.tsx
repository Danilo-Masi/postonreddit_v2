import { useAppContext } from "@/context/AppContext";
import { X } from "lucide-react";

export default function SubredditsSelected() {
    const { subredditsSelected, setSubredditsSelected } = useAppContext();

    const handleDeleteSubreddit = (sub: string) => {
        const subredditsList = subredditsSelected.filter((item) => sub !== item);
        setSubredditsSelected(subredditsList);
    }

    return (
        <div className="w-full h-fit max-h-auto flex flex-wrap items-start justify-start gap-5 md:gap-3">
            <h4 className="w-full text-sm font-light text-zinc-300">Subreddits selected</h4>
            {subredditsSelected.map((sub) => (
                <div
                    key={sub}
                    className="min-w-[calc(50%-10px)] h-fit flex items-center justify-between p-3 md:p-2 bg-zinc-800 hover:bg-zinc-800/60 rounded-md text-zinc-300 text-sm cursor-pointer" >
                    {sub}
                    <X className="h-4 w-4 ml-2" onClick={() => handleDeleteSubreddit(sub)} />
                </div>
            ))}
        </div>
    )
}
