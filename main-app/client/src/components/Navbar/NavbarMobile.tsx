import { CalendarCheck2, Command, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function NavbarMobile() {
    const { pathname } = useLocation();

    return (
        <div className="w-full h-[10svh] absolute bottom-0 left-0 flex z-50 border-t border-zinc-600">
            <Link
                to="/"
                className={`w-1/3 flex flex-col items-center justify-center gap-1 text-sm ${pathname === "/" ? "text-zinc-100" : "text-zinc-500"}`}>
                <Command className="w-5 h-5" />
                <span>Dashboard</span>
            </Link>
            <Link
                to="/scheduled"
                className={`w-1/3 flex flex-col items-center justify-center gap-1 text-sm ${pathname === "/scheduled" ? "text-zinc-100" : "text-zinc-500"}`}>
                <CalendarCheck2 className="w-5 h-5" />
                <span>Scheduled</span>
            </Link>
            <Link
                to="/settings"
                className={`w-1/3 flex flex-col items-center justify-center gap-1 text-sm ${pathname === "/settings" ? "text-zinc-100" : "text-zinc-500"}`}>
                <Settings className="w-5 h-5" />
                <span>Settings</span>
            </Link>
        </div>
    );
}