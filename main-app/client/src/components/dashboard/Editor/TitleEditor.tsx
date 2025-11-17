import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function TitleEditor() {
    const [title, setTitle] = useState("");

    const handleInsertTitle = (e: any) => {
        setTitle(e.target.value);
    }

    return (
        <div className="grid w-full gap-3">
            <Label htmlFor="post-title" className="text-zinc-200">Post title</Label>
            <Textarea
                value={title}
                onChange={(e) => handleInsertTitle(e)}
                className="w-full md:w-full resize-none"
                placeholder="Type your title post here..."
                id="post-title" />
            <p className="text-red-500 text-sm hidden">
                Your message will be copied to the support team.
            </p>

        </div>
    )
}
