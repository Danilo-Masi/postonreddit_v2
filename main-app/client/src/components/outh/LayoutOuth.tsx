import type { ReactNode } from "react";

export default function LayoutOuth({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-svh flex flex-col items-center justify-center p-5 md:p-0 gap-3 bg-zinc-800">
            {children}
        </div>
    )
}
