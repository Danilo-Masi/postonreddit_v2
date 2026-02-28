import PeriodSelect from "@/components/scheduled/PeriodSelect";
import Layout from "../components/layout/Layout";
import PostTemplate from "@/components/scheduled/PostTemplate";
import EmptyContainer from "@/components/scheduled/EmptyContainer";
import { useEffect, useState } from "react";
import AlertDeletePost from "@/components/scheduled/AlertDeletePost";
import { postsListFunction } from "@/api/post/posts-list";

type postType = {
  id: string;
  title: string;
  content: string;
  post_targets: { subreddit: string, scheduled_at: string }[];
};

export default function Scheduled() {
  const [isAlertDeleteOpen, setAlertDeleteOpen] = useState(false);
  const [postsList, setPostsList] = useState<postType[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const res = await postsListFunction("today");
      console.log("Posts list response: ", res); // DEBUG LOG
      if (res.ok) {
        setPostsList(res.posts);
      }
    }

    loadPosts();
  }, []);

  /*const handleEditPost = (postId: string) => {
    alert(`Edit post with ID: ${postId}`);
  }*/

  return (
    <Layout>
      <PeriodSelect />
      <div className="w-full h-auto min-h-full flex flex-wrap gap-3 mt-5">
        {postsList ? (
          postsList.map((post) => (
            <PostTemplate
              key={post.id}
              post_id={post.id}
              title={post.title}
              content={post.content}
              postTargets={post.post_targets}
              setAlertDeleteOpen={setAlertDeleteOpen}
              //handleEditPost={handleEditPost(post.id)}
            />
          ))
        ) : (
          <EmptyContainer />
        )}
      </div>

      <AlertDeletePost isAlertDeleteOpen={isAlertDeleteOpen} setAlertDeleteOpen={setAlertDeleteOpen} />

    </Layout>
  )
}