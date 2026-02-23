import { Textarea } from "@/components/ui/textarea"
import { useAppContext } from "@/context/AppContext";

export default function TitleEditor() {
    const MAX_LENGTH = 120;
    const { titlePost, setTitlePost } = useAppContext();

    return (
        <div className="grid w-full gap-3">
            <Textarea
                value={titlePost}
                onChange={(e) => setTitlePost(e.target.value)}
                className={`w-full resize-none text-lg placeholder:text-zinc-500 border border-zinc-700 rounded-md focus:border-orange-500 transition-colors duration-200 ${titlePost.length > MAX_LENGTH ? 'text-red-500' : 'text-zinc-200'}`}
                placeholder="Post title"
                id="post-title"
            />
            <p className={`text-xs text-right ${titlePost.length > MAX_LENGTH ? 'text-red-500' : 'text-zinc-400'}`}>
                {titlePost.length}/{MAX_LENGTH}
            </p>
        </div>
    )
}
