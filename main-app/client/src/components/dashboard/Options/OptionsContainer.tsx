import { useIsMobile } from "@/lib/responsive";
import { ButtonDisabled, ButtonNextSection, ButtonPrevSection } from "../ButtonChangeSection";
import SubredditsSelect from "./SubredditsSelect";
import SubredditsSelected from "./SubredditsSelected";
import { useAppContext } from "@/context/AppContext";
import FlairsSelect from "./FlairsSelect";

export default function OptionsContainer() {
  const isMobile = useIsMobile();
  const { subredditsSelected } = useAppContext();

  return (
    <div className="w-full md:w-1/3 h-full overflow-scroll flex flex-col md:px-5">
      <SubredditsSelect />

      {subredditsSelected.length >= 1 ? (
        <>
          <SubredditsSelected />
          {subredditsSelected.map((sub) => (
            <FlairsSelect subName={sub.name} key={sub.id} />
          ))
          }
          <ButtonNextSection />
        </>
      ) : (
        <>
          <div className="w-full h-full flex items-center justify-center text-zinc-100">
            No subreddits selected yet
          </div>
          <ButtonDisabled />
        </>
      )}

      {isMobile && <ButtonPrevSection />}
    </div>
  )
}
