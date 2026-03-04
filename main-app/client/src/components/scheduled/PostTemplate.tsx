import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button"
import { Ban, SquarePen } from "lucide-react"
import { useState, type Dispatch, type SetStateAction } from "react"
import { useAppContext } from "@/context/AppContext";
import { Spinner } from "../ui/spinner";
import { useNavigate } from "react-router-dom";

interface PostTargetsInterface {
    subreddit: string;
    scheduled_at: string;
}

interface PostTemplateInterface {
    post_id: string;
    title: string;
    content: string;
    postTargets: PostTargetsInterface[];
    setAlertDeleteOpen: Dispatch<SetStateAction<boolean>>;
}

export default function PostTemplate({ post_id, title, content, postTargets, setAlertDeleteOpen }: PostTemplateInterface) {
    const navigate = useNavigate();
    const { setPostIdSelected, postsList, setTitlePost, setContentPost, setSubredditTargets } = useAppContext();
    const [isEditLoading, setEditLoading] = useState(false);

    const handleEditPost = () => {
        setEditLoading(true);
        const post = postsList.find((item) => item.id === post_id);
        if (!post) return;
        setTitlePost(post.title);
        setContentPost(post.content);
        setSubredditTargets((post.targets ?? []).map((target) => ({
            subreddit: target.subreddit,
            scheduledAt: target.scheduled_at,
            flairId: '',
            flairName: ''
        })));
        setEditLoading(false);
        navigate("/", { replace: true });
    };

    const handleDeletePost = () => {
        setPostIdSelected(post_id);
        setAlertDeleteOpen(true);
    }

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleString("en-EN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    return (
        <Card className="w-full md:w-[calc(33%-5px)] h-fit md:max-h-[60svh] md:overflow-hidden bg-zinc-800 border-zinc-700">
            <CardHeader>
                <CardTitle className="text-zinc-50 text-xl font-bold">
                    {title.length > 50 ? title.slice(0, 50) + "..." : title}
                </CardTitle>
                <div className="flex flex-wrap gap-3 mt-1">
                    {postTargets.map((target, index) => (
                        <CardDescription key={index} className="bg-zinc-600 w-fit px-3 py-1 text-zinc-100 text-sm rounded-md">
                            {target.subreddit} : {formatDate(target.scheduled_at)}
                        </CardDescription>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="text-zinc-300 text-sm font-light">
                {content.length > 150 ? content.slice(0, 150) + "..." : content}
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
                <Button
                    disabled={isEditLoading}
                    onClick={handleEditPost}
                    className="cursor-pointer disabled:cursor-none">
                    {isEditLoading
                        ? (<>
                            <Spinner /> Loading
                        </>)
                        : (<>
                            <SquarePen /> Edit
                        </>)
                    }
                </Button>
                <Button
                    onClick={handleDeletePost}
                    variant="destructive"
                    className="cursor-pointer disabled:cursor-none">
                    <Ban />Delete
                </Button>
            </CardFooter>
        </Card>
    )
}
