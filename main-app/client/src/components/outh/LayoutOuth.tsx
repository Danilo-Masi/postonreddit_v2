import type { ReactNode } from "react";

export default function LayoutOuth({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-svh flex flex-col items-center justify-between md:justify-center md:gap-5 p-5 md:p-0 bg-zinc-900">
            {children}
        </div>
    )
}
