import { useIsMobile } from "@/lib/responsive";
import { ButtonNextSection, ButtonPrevSection } from "../ButtonChangeSection";

export default function ResultContainer() {
  const isMobile = useIsMobile();
  return (
    <div className="w-full md:w-2/3 h-full overflow-scroll flex flex-col bg-red-500">
      {isMobile && (
        <>
          <ButtonNextSection />
          <ButtonPrevSection />
        </>
      )}
    </div>
  )
}
