import type { ReactNode } from "react";
import NavbarMobile from "../Navbar/NavbarMobile";
import NavbarDesktop from "../Navbar/NavbarDesktop";
import { useIsMobile } from "@/lib/responsive";

export default function Layout({ children }: { children: ReactNode }) {
    const isMobile = useIsMobile();

    return (
        <div className="w-full h-svh max-h-svh flex flex-col md:flex-wrap bg-zinc-900">
            {isMobile ? <NavbarMobile /> : <NavbarDesktop />}
            <div className="w-full md:w-4/5 h-[90svh] md:h-svh p-5">
                <div className="w-full h-full max-h-full flex flex-wrap overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}
