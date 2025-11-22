import { Button } from "@/components/ui/button";
import { SquareCheckBig } from "lucide-react";

export default function ButtonSchedule() {
    return (
        <Button
            className="w-full text-sm p-6 md:p-3 bg-orange-600 hover:bg-orange-600/90 cursor-pointer">
            Schedule
            <SquareCheckBig />
        </Button>
    )
}
