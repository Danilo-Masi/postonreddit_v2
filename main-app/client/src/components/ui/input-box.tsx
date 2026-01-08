import type { ReactNode } from "react";

export default function InputBox({ children }: { children: ReactNode }) {
    return (
        <div className="relative w-full">
            {children}
        </div>
    )
}
