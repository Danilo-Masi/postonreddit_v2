import { useCallback } from "react";
import { useAppContext } from "@/context/AppContext";
import { useIsMobile } from "@/lib/responsive";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

function useDashboardSectionNavigation() {
    const isMobile = useIsMobile();
    const { setDashboardSectionMobile, setDashboardSectionDesktop } = useAppContext();

    const scrollToTop = useCallback(() => {
        if (typeof window === "undefined") return;
        requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }, []);

    const changeSection = useCallback(
        (delta: number, shouldScroll = false) => {
            if (isMobile) {
                setDashboardSectionMobile((prev) => Math.max(0, prev + delta));
                if (shouldScroll) scrollToTop();
            } else {
                setDashboardSectionDesktop((prev) => Math.max(0, prev + delta));
            }
        },
        [isMobile, scrollToTop, setDashboardSectionDesktop, setDashboardSectionMobile],
    );

    return {
        goForward: () => changeSection(1, isMobile),
        goBackward: () => changeSection(-1),
    };
}

export function ButtonNextSection() {
    const { goForward } = useDashboardSectionNavigation();
    return (
        <Button
            onClick={goForward}
            className="w-full text-sm p-6 md:p-3 bg-orange-600 hover:bg-orange-600/90 cursor-pointer">
            Next step
            <ArrowRight />
        </Button>
    );
}

export function ButtonPrevSection() {
    const { goBackward } = useDashboardSectionNavigation();
    return (
        <Button
            onClick={goBackward}
            className="w-full text-sm p-6 md:p-3 bg-zinc-950 hover:bg-zinc-950/60 cursor-pointer">
            <ArrowLeft />
            Previous step
        </Button>
    );
}

export function ButtonDisabled() {
    return (
        <Button disabled className="w-full text-sm p-6 md:p-3 bg-zinc-700">
            Next step
            <ArrowRight />
        </Button>
    )
}
