import { useAppContext } from "@/context/AppContext";
import { ButtonPrevSection } from "../ButtonChangeSection";
import ButtonSchedule from "./ButtonSchedule";
import ReviewTime from "./ReviewTime";
import { useIsMobile } from "@/lib/responsive";
import ProgressBar from "../ProgressBar";

export default function ReviewContainer() {
  const isMobile = useIsMobile();
  const { titlePost, contentPost, subredditsSelected } = useAppContext();

  return (
    <div className="w-full md:w-1/3 h-full overflow-scroll flex flex-col gap-5 md:px-5 ">
      {isMobile && <ProgressBar />}
      <div className="w-full h-full overflow-scroll flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-zinc-100 mb-5">{titlePost}</h2>
        <p className="text-md font-light text-zinc-300 mb-5">{contentPost}</p>
        {subredditsSelected.map((sub) => (
          <ReviewTime subreddit={sub.name} key={sub.id} />
        ))}
      </div>
      <div className="w-full h-fit flex flex-col gap-3">
        <ButtonSchedule />
        <ButtonPrevSection />
      </div>
    </div>
  )
}
