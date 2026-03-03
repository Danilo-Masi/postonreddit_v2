import PeriodSelect from "@/components/scheduled/PeriodSelect";
import Layout from "../components/layout/Layout";
import PostTemplate from "@/components/scheduled/PostTemplate";
import { useEffect, useState } from "react";
import AlertDeletePost from "@/components/scheduled/AlertDeletePost";
import { postsListFunction } from "@/api/post/posts-list";
import { toast } from "sonner";
import { PostSkeleton } from "@/components/scheduled/PostSkeleton";
import { EmptyContainer } from "@/components/scheduled/EmptyContainer";
import { useAppContext } from "@/context/AppContext";



export default function Scheduled() {
  const [isLoadingPosts, setLoadingPosts] = useState(false);
  const { postsList, setPostsList } = useAppContext();
  const [periodValue, setPeriodValue] = useState("today");
  const [isAlertDeleteOpen, setAlertDeleteOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      setLoadingPosts(true);

      try {
        const res = await postsListFunction(periodValue);

        if (!isMounted) return;

        if (res.ok) {
          setPostsList(res.posts);
        } else {
          toast.warning(res.error);
          setPostsList([]);
        }
      } catch (error) {
        toast.warning("Some error occurred. Please try again later.");
        console.error("Client error occurred: ", error);
        setPostsList([]);
      } finally {
        if (isMounted) setLoadingPosts(false);
      }
    }

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, [periodValue]);

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
        ) : postsList.length > 0 && !isLoadingPosts ? (
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