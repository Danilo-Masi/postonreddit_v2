import PeriodSelect from "@/components/scheduled/PeriodSelect";
import Layout from "../components/layout/Layout";
import PostTemplate from "@/components/scheduled/PostTemplate";
import EmptyContainer from "@/components/scheduled/EmptyContainer";
import { useState } from "react";
import AlertDeletePost from "@/components/scheduled/AlertDeletePost";

type postType = {
  title: string;
  content: string;
};

const posts: postType[] = [
  { title: "lorem ipsum amamaet", content: "Praesent in accumsan enim. Sed pulvinar ante non tortor tincidunt auctor. Vestibulum nisi massa, commodo sed tempor non, consequat quis eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam varius ultricies orci quis mattis. Nam vulputate sagittis tempus. Integer aliquam dui non nulla egestas." },
  { title: "lorem ipsum amamaet", content: "Praesent in accumsan enim. Sed pulvinar ante non tortor tincidunt auctor. Vestibulum nisi massa, commodo sed tempor non, consequat quis eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam varius ultricies orci quis mattis. Nam vulputate sagittis tempus. Integer aliquam dui non nulla egestas." },
  { title: "lorem ipsum amamaet", content: "Praesent in accumsan enim. Sed pulvinar ante non tortor tincidunt auctor. Vestibulum nisi massa, commodo sed tempor non, consequat quis eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam varius ultricies orci quis mattis. Nam vulputate sagittis tempus. Integer aliquam dui non nulla egestas." },
  { title: "lorem ipsum amamaet", content: "Praesent in accumsan enim. Sed pulvinar ante non tortor tincidunt auctor. Vestibulum nisi massa, commodo sed tempor non, consequat quis eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam varius ultricies orci quis mattis. Nam vulputate sagittis tempus. Integer aliquam dui non nulla egestas." },
];

export default function Scheduled() {
  const [isAlertDeleteOpen, setAlertDeleteOpen] = useState(false);

  return (
    <Layout>
      <PeriodSelect />
      <div className="w-full h-full overflow-scroll flex flex-wrap gap-3 mt-5">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostTemplate title={post.title} content={post.content} key={post.title} setAlertDeleteOpen={setAlertDeleteOpen}/>
          ))
        ) : (
          <EmptyContainer />
        )}
      </div>

      <AlertDeletePost isAlertDeleteOpen={isAlertDeleteOpen} setAlertDeleteOpen={setAlertDeleteOpen} />

    </Layout>
  )
}