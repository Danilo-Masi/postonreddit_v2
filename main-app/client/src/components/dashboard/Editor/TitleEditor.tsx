import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function TitleEditor() {
    const MAX_LENGTH = 120;
    const [title, setTitle] = useState("");

    return (
        <div className="grid w-full gap-3">
            <Textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full resize-none text-lg placeholder:text-zinc-500 border border-zinc-700 rounded-md focus:border-orange-500 transition-colors duration-200 ${title.length > MAX_LENGTH ? 'text-red-500' : 'text-zinc-200'}`}
                placeholder="Post title"
                id="post-title"
            />
            <p className={`text-xs text-right ${title.length > MAX_LENGTH ? 'text-red-500' : 'text-zinc-400'}`}>
                {title.length}/{MAX_LENGTH}
            </p>
        </div>
    )
}
