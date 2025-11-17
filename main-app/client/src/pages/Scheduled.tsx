import PeriodSelect from "@/components/scheduled/PeriodSelect";
import Layout from "../components/layout/Layout";
import PostTemplate from "@/components/scheduled/PostTemplate";
import { Button } from "@/components/ui/button";
import { SquareCheckBig } from "lucide-react";
import { Link } from "react-router-dom";

type postType = {
  title: string;
  content: string;
};

const posts: postType[] = [];

export default function Scheduled() {
  return (
    <Layout>
      <PeriodSelect />
      <div className="w-full h-fit flex flex-wrap gap-3 mt-5">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostTemplate title={post.title} content={post.content} key={post.title} />
          ))
        ) : (
          <div className="w-full h-fit flex flex-col items-center justify-center gap-3">
            <p className="text-sm text-zinc-200">No post scheduled in this period</p>
            <Button className="text-sm p-5 md:p-3 cursor-pointer bg-orange-600 hover:bg-orange-600/90">
              <Link to="/" className="flex items-center gap-3">
                Schedule now
                <SquareCheckBig />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  )
}
