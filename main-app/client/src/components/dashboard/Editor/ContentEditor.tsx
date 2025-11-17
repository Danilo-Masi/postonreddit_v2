import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContentEditor() {
    return (
        <div className="w-full h-full flex flex-col gap-3">
            <Label htmlFor="post-title" className="text-zinc-200">Post content</Label>
            <Textarea
                className="w-full h-full resize-none"
                placeholder="Type your content here..."
                id="post-title" />
            <p className="text-red-500 text-sm hidden">
                Your message will be copied to the support team.
            </p>
        </div>
    )
}
