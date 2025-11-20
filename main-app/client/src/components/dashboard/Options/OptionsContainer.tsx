import { useIsMobile } from "@/lib/responsive";
import { ButtonDisabled, ButtonNextSection, ButtonPrevSection } from "../ButtonChangeSection";
import SubredditsSelected from "./SubredditsSelected";
import { useAppContext } from "@/context/AppContext";
import FlairsSelect from "./FlairsSelect";
import SubredditMultiselect from "./SubredditsMultiselect";
import ProgressBar from "../ProgressBar";

export default function OptionsContainer() {
  const isMobile = useIsMobile();
  const { subredditsSelected } = useAppContext();

  return (
    <div className="w-full md:w-1/3 h-full overflow-scroll flex flex-col gap-5 md:px-5">
      {isMobile && <ProgressBar />}

      <SubredditMultiselect />

      {subredditsSelected.length >= 1 ? (
        <>
          <div className="w-full h-full flex flex-col gap-8 overflow-scroll">
            <SubredditsSelected />
            {subredditsSelected.map((sub) => (
              <FlairsSelect subName={sub.name} key={sub.id} />
            ))
            }
          </div>
          <div className="w-full h-fit flex flex-col gap-3">
            <ButtonNextSection />
            {isMobile && <ButtonPrevSection />}
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-full flex items-center justify-center text-zinc-100">
            No subreddits selected yet
          </div>
          <ButtonDisabled />
        </>
      )}

    </div>
  )
}
