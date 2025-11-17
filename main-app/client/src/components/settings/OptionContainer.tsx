import type { ReactNode } from "react";

export default function OptionContainer({ label, children }: { label: String, children: ReactNode }) {
    return (
        <div className="w-full h-fit flex flex-col gap-3 mb-5">
            <p className="text-md font-medium text-zinc-300">{label}</p>
            {children}
        </div>
    )
}
