import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { SquareCheckBig } from "lucide-react";

export default function EmptyContainer() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <p className="text-sm text-zinc-200">No post scheduled in this period</p>
            <Button className="text-sm p-5 md:p-3 cursor-pointer bg-orange-600 hover:bg-orange-600/90">
                <Link to="/" className="flex items-center gap-3">
                    Schedule now
                    <SquareCheckBig />
                </Link>
            </Button>
        </div>
    )
}
