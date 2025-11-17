import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function FlairsSelect({ subName }: { subName: string }) {
    return (
        <div className="w-full h-full max-h-auto flex flex-col gap-3 mb-5">
            <h3 className="text-sm font-semibold text-zinc-200">Select the flair for {subName}</h3>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
