import { Command, CalendarCheck2, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MenuNavbarDesktop() {
    const { pathname } = useLocation();

    return (
        <div className="w-full h-full">
            <ul className="flex flex-col gap-5">
                <li className={`w-full rounded-md p-3 flex items-center gap-2 text-sm ${pathname === "/" ? 'text-zinc-100 bg-zinc-700 hover:bg-zinc-700/90' : 'text-zinc-300 bg-zinc-800/30 hover:bg-zinc-700'}`}>
                    <Command className="w-4 h-4" />
                    <Link to="/">Dashboard</Link>
                </li>
                <li className={`w-full rounded-md p-3 flex items-center gap-2 text-sm ${pathname === "/scheduled" ? 'text-zinc-100 bg-zinc-700 hover:bg-zinc-700/90' : 'text-zinc-300 bg-zinc-800/30 hover:bg-zinc-700'}`}>
                    <CalendarCheck2 className="w-4 h-4" />
                    <Link to="/scheduled">Scheduled</Link>
                </li>
                <li className={`w-full rounded-md p-3 flex items-center gap-2 text-sm ${pathname === "/settings" ? 'text-zinc-100 bg-zinc-700 hover:bg-zinc-700/90' : 'text-zinc-300 bg-zinc-800/30 hover:bg-zinc-700'}`}>
                    <Settings className="w-4 h-4" />
                    <Link to="/settings">Settings</Link>
                </li>
            </ul>
        </div>
    )
}
