import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { useAppContext } from "@/context/AppContext"
import { getSubreddits } from "@/api/reddit/reddit-subreddits"

type Subreddit = {
    name: string
}

export default function SubredditMultiselect() {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [results, setResults] = useState<Subreddit[]>([])
    const [values, setValues] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const { setSubredditsSelected } = useAppContext()

    // Fetch with debounce
    useEffect(() => {
        if (search.length < 2) {
            setResults([])
            return
        }

        const timeout = setTimeout(async () => {
            setLoading(true)
            const res = await getSubreddits(search)
            if (res.ok) setResults(res.subreddits)
            setLoading(false)
        }, 350)

        return () => clearTimeout(timeout)
    }, [search])

    // Selezione multipla dei valori
    const toggleValue = (name: string) => {
        setValues((prev) => {
            const updated = prev.includes(name)
                ? prev.filter((v) => v !== name)
                : [...prev, name]

            setSubredditsSelected(updated)
            return updated
        })
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>

            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    aria-expanded={open}
                    className="w-full h-fit justify-between bg-zinc-800 border border-zinc-700">
                    {values.length === 0
                        ? "Select subreddits..."
                        : `${values.length} selected`}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[330px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search subreddits..."
                        value={search}
                        onValueChange={setSearch} />

                    <CommandList>
                        {loading && (
                            <div className="p-3 text-sm text-zinc-400">
                                Searching subreddits...
                            </div>
                        )}

                        {!loading && results.length === 0 && (
                            <CommandEmpty>No subreddits found.</CommandEmpty>
                        )}

                        <CommandGroup>
                            {results.map((sub) => {
                                const selected = values.includes(sub.name)
                                return (
                                    <CommandItem
                                        key={sub.name}
                                        value={sub.name}
                                        onSelect={() => toggleValue(sub.name)}>
                                        <CheckIcon
                                            className={cn("mr-2 h-4 w-4", selected ? "opacity-100" : "opacity-0")} />
                                        {sub.name}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}