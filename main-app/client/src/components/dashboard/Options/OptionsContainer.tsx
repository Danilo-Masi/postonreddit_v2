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
    <div className="w-full md:w-[calc(35%-10px)] h-full overflow-scroll flex flex-col gap-5">
      {isMobile && <ProgressBar />}

      {subredditsSelected.length >= 1 ? (
        <>
          <div className="w-full h-full flex flex-col gap-5 overflow-scroll">
            <SubredditMultiselect />
            <SubredditsSelected />
            {subredditsSelected.map((sub) => (
              <FlairsSelect subName={sub} key={sub} />
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
          <SubredditMultiselect />
          <div className="w-full h-full flex items-center justify-center text-zinc-100">
            No subreddits selected yet
          </div>
          <ButtonDisabled />
        </>
      )}

    </div>
  )
}
