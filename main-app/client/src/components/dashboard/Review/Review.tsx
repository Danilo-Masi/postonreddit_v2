import { useAppContext } from "@/context/AppContext";
import { ButtonPrevSection } from "../ButtonChangeSection";
import ButtonSchedule from "./ButtonSchedule";
import ReviewTime from "./ReviewTime";
import { useIsMobile } from "@/lib/responsive";
import ProgressBar from "../ProgressBar";
import { createPostFunction } from "@/api/post/create-post";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Review() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { titlePost, setTitlePost, contentPost, setContentPost, subredditTargets, setSubredditTargets, setDashboardSectionMobile, setDashboardSectionDesktop, invalidatePostsCache } = useAppContext();

  const handleSchedule = async () => {
    const res = await createPostFunction();
    if (res.ok) {
      setTitlePost("");
      setContentPost("");
      setSubredditTargets([]);
      setDashboardSectionDesktop(1);
      setDashboardSectionMobile(1);
      invalidatePostsCache();
      toast.success("Post created successfully!");
      navigate("/scheduled", { replace: true });
    } else {
      console.log("Failed to create post: ", { res }); // DEBUG LOG
      toast.error(`Failed to create post. Please try again`);
    }
  }

  return (
    <div className="w-full md:w-[calc(35%-10px)] h-full overflow-scroll flex flex-col gap-5">
      {isMobile && <ProgressBar />}
      <div className="w-full h-full overflow-scroll flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-zinc-100 text-balance">{titlePost}</h2>
        <p className="text-md font-light text-zinc-300 mb-5 text-balance">{contentPost?.toString()}</p>
        {subredditTargets.map((sub) => (
          <ReviewTime subreddit={sub.subreddit} key={sub.subreddit} />
        ))}
      </div>
      <div className="w-full h-fit flex flex-col gap-3">
        <ButtonSchedule handleSchedule={handleSchedule} />
        <ButtonPrevSection />
      </div>
    </div>
  )
}
