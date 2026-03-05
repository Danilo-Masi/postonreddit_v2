import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { postsListFunction } from "@/api/post/posts-list";
import Layout from "../components/layout/Layout";
import PeriodSelect from "@/components/scheduled/PeriodSelect";
import { PostSkeleton } from "@/components/scheduled/PostSkeleton";
import PostTemplate from "@/components/scheduled/PostTemplate";
import { EmptyContainer } from "@/components/scheduled/EmptyContainer";
import AlertDeletePost from "@/components/scheduled/AlertDeletePost";
import { toast } from "sonner";

export default function Scheduled() {
  const [periodValue, setPeriodValue] = useState("today");
  const [isLoadingPosts, setLoadingPosts] = useState(false);
  const [isAlertDeleteOpen, setAlertDeleteOpen] = useState(false);
  const { postsCache, setPostsCache } = useAppContext();

  const CACHE_TTL = 5 * 60 * 1000;

  // Prendiamo i post dalla cache
  const postsList = postsCache[periodValue]?.data || [];

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      const cached = postsCache[periodValue];
      // Se esiste cache e NON è scaduta non fare nulla
      if (cached) {
        const isExpired = Date.now() - cached.timestamp > CACHE_TTL;
        if (!isExpired) return;
      }
      // Fetch solo se necessario
      setLoadingPosts(true);
      try {
        const res = await postsListFunction(periodValue);
        if (!isMounted) return;
        if (res.ok) {
          setPostsCache(prev => ({
            ...prev,
            [periodValue]: {
              data: res.posts,
              timestamp: Date.now(),
            },
          }));
        } else {
          console.log("Fetch posts error: ", res.error);
          toast.warning("Error fetching posts. Please try again later.");
        }
      } catch (error) {
        console.error("Client error occurred:", error);
        toast.warning("Some error occurred. Please try again later.");
      } finally {
        if (isMounted) setLoadingPosts(false);
      }
    }

    loadPosts();

    return () => { isMounted = false };
  }, [periodValue, postsCache, setPostsCache]);

  return (
    <Layout>
      <PeriodSelect
        periodValue={periodValue}
        setPeriodValue={setPeriodValue} />

      <div className="w-full h-auto min-h-full flex flex-wrap gap-3 mt-5">
        {isLoadingPosts ? (
          <div className="w-full h-full flex flex-wrap gap-3">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        ) : postsList.length > 0 ? (
          postsList.map((post) => (
            <PostTemplate
              key={post.id}
              post_id={post.id}
              title={post.title}
              content={post.content}
              postTargets={post.targets}
              setAlertDeleteOpen={setAlertDeleteOpen}
            />
          ))
        ) : (
          <EmptyContainer />
        )}
      </div>

      <AlertDeletePost
        isAlertDeleteOpen={isAlertDeleteOpen}
        setAlertDeleteOpen={setAlertDeleteOpen} />
    </Layout>
  );
}