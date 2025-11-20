import { useAppContext } from "@/context/AppContext";
import { XCircle } from "lucide-react";

export default function SubredditsSelected() {
    const { subredditsSelected } = useAppContext();

    return (
        <div className="w-full h-fit max-h-auto flex flex-wrap items-start justify-start gap-5 md:gap-3">
            <h4 className="w-full text-sm font-light text-zinc-300">Subreddits selected</h4>
            {subredditsSelected.map((sub) => (
                <div
                    key={sub.id}
                    className="min-w-[calc(50%-10px)] h-fit flex justify-between p-3 md:p-2 bg-zinc-800 hover:bg-zinc-800/60 rounded-md text-zinc-300 text-sm cursor-pointer" >
                    {sub.name}
                    <XCircle className="h-5 w-5 ml-3" />
                </div>
            ))}
        </div>
    )
}
