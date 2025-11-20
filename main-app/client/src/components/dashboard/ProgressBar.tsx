import { useAppContext } from "@/context/AppContext"

export default function ProgressBar() {
    const { dashboardSectionMobile } = useAppContext();

    return (
        <div className="w-full h-fit flex items-center justify-center gap-3">
            <div className={`w-[calc(25%-6px)] h-[2svh] rounded-full border border-zinc-600 ${dashboardSectionMobile >= 1 && 'bg-zinc-300'}`} />
            <div className={`w-[calc(25%-6px)] h-[2svh] rounded-full border border-zinc-600 ${dashboardSectionMobile >= 2 && 'bg-zinc-300'}`} />
            <div className={`w-[calc(25%-6px)] h-[2svh] rounded-full border border-zinc-600 ${dashboardSectionMobile >= 3 && 'bg-zinc-300'}`} />
            <div className={`w-[calc(25%-6px)] h-[2svh] rounded-full border border-zinc-600 ${dashboardSectionMobile === 4 && 'bg-zinc-300'}`} />
        </div>
    )
}
