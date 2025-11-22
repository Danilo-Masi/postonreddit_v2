import { useIsMobile } from "@/lib/responsive";
import { ButtonNextSection, ButtonPrevSection } from "../ButtonChangeSection";
import ProgressBar from "../ProgressBar";
import { useAppContext } from "@/context/AppContext";
import MomentSelect from "./MomentSelect";
import Legend from "./Legend";

export default function ResultContainer() {
  const isMobile = useIsMobile();
  const { subredditsSelected } = useAppContext();

  return (
    <div className="w-full md:w-[calc(65%-10px)] h-full flex flex-col gap-5">
      {isMobile && <ProgressBar />}
      <div className="w-full h-full flex flex-col items-start justify-start overflow-scroll gap-18 md:gap-10">
        {subredditsSelected.map((sub) => (
          <MomentSelect sub={sub.name} key={sub.id} />
        ))}
        <Legend />
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
