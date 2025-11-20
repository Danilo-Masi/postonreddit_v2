import { useIsMobile } from "@/lib/responsive";
import { ButtonNextSection, ButtonPrevSection } from "../ButtonChangeSection";
import TimeBock from "./TimeBock";
import ProgressBar from "../ProgressBar";

export default function ResultContainer() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full md:w-2/3 h-full flex flex-col gap-5">
      {isMobile && <ProgressBar />}
      <div className="w-full h-full flex flex-wrap items-start justify-start overflow-scroll gap-5">
        <TimeBock />
        <TimeBock />
        <TimeBock />
        <TimeBock />
        <TimeBock />
        <TimeBock />
        <TimeBock />
        <TimeBock />
        <TimeBock />
        <TimeBock />
        <TimeBock />
        <TimeBock />
        <TimeBock />
        <TimeBock />
        <TimeBock />
        <TimeBock />
      </div>
      {isMobile && (
        <div className="w-full h-fit flex flex-col gap-3">
          <ButtonNextSection />
          <ButtonPrevSection />
        </div>
      )}
    </div>
  )
}
