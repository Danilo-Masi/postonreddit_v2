import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button"
import { Ban, SquarePen } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"

export default function PostTemplate({ title, content, setAlertDeleteOpen }: { title: string, content: string, setAlertDeleteOpen: Dispatch<SetStateAction<boolean>> }) {
    return (
        <Card className="w-full md:w-[calc(33%-5px)] h-fit bg-zinc-800 border-zinc-700">
            <CardHeader>
                <CardTitle className="text-zinc-50">{title}</CardTitle>
                <CardDescription className="text-zinc-400">Scheduled for 02/12/2025</CardDescription>
            </CardHeader>
            <CardContent className="text-zinc-200">
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
