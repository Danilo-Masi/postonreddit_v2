import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PostSkeleton() {
    return (
        <Card className="w-full md:w-[calc(33%-5px)] h-fit md:max-h-[60svh] md:overflow-hidden bg-zinc-800 border-zinc-700">
            <CardHeader>
                <Skeleton className="h-4 w-2/3 bg-zinc-400" />
                <Skeleton className="h-4 w-1/2 bg-zinc-600" />
            </CardHeader>
            <CardContent>
                <Skeleton className="aspect-video w-full bg-zinc-500" />
            </CardContent>
        </Card>
    )
}
