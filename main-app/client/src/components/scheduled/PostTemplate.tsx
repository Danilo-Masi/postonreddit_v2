import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button"
import { Ban, SquarePen } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"

export default function PostTemplate({ title, content, postTargets, setAlertDeleteOpen }: { title: string, content: string, postTargets: Array<{ subreddit: string }>, setAlertDeleteOpen: Dispatch<SetStateAction<boolean>> }) {
    return (
        <Card className="w-full md:w-[calc(33%-5px)] h-fit bg-zinc-800 border-zinc-700">
            <CardHeader>
                <CardTitle className="text-zinc-50 text-xl font-bold">{title}</CardTitle>
                <div className="flex flex-wrap gap-3 mt-1">
                    {postTargets.length > 0 && postTargets.map((target, index) => (
                        <CardDescription key={index} className="bg-zinc-600 w-min px-3 py-1 text-zinc-100 text-sm rounded-md">
                            {target.subreddit}
                        </CardDescription>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="text-zinc-300 text-sm font-light">
                {content}
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
                <Button
                    className="cursor-pointer">
                    <SquarePen /> Edit
                </Button>
                <Button
                    className="cursor-pointer"
                    variant="destructive"
                    onClick={() => setAlertDeleteOpen(true)}>
                    <Ban />Delete
                </Button>
            </CardFooter>
        </Card>
    )
}
