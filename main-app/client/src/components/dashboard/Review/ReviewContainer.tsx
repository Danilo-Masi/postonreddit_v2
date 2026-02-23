import { useAppContext } from "@/context/AppContext";
import { ButtonPrevSection } from "../ButtonChangeSection";
import ButtonSchedule from "./ButtonSchedule";
import ReviewTime from "./ReviewTime";
import { useIsMobile } from "@/lib/responsive";
import ProgressBar from "../ProgressBar";
import { createPostFunction } from "@/api/post/create-post";

export default function ReviewContainer() {
  const isMobile = useIsMobile();
  const { titlePost, contentPost, subredditTargets } = useAppContext();

  const handleSchedule = async () => {
    // Implement scheduling logic here
    alert(`Title post: ${titlePost}\nContent post: ${contentPost}\nSubreddits: ${subredditTargets.map(sub => sub.subreddit).join(', ')}\nFLairs: ${subredditTargets.map(sub => sub.flairName).join(', ')}\nTimes: ${subredditTargets.map(sub => sub.scheduledAt).join(', ')}`);
    const res = await createPostFunction();
    if (res.ok) {
      alert("Post created successfully!");
    } else {
      alert(`Failed to create post: ${res.error}`);
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
