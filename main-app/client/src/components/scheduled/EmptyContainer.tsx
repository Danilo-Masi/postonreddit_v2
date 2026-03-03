import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Folder } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function EmptyContainer() {
    const navigate = useNavigate();

    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Folder />
                </EmptyMedia>
                <EmptyTitle
                    className="text-zinc-100">
                    No post scheduled yet
                </EmptyTitle>
                <EmptyDescription
                    className="text-zinc-500">
                    You haven&apos;t scheduled any post yet. Get started by creating
                    your first post.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button
                    onClick={() => navigate("/", { replace: true })}
                    variant="outline"
                    className="cursor-pointer">
                    Create your post
                </Button>
            </EmptyContent>
        </Empty>
    )
}
