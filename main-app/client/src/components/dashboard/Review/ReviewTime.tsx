export default function ReviewTime({ subreddit }: { subreddit: string }) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDay();

    return (
        <div className="w-full flex flex-wrap items-center justify-between gap-y-1 mb-5">
            <p className="text-zinc-100 font-medium text-md min-w-1/2">{subreddit}</p>
            <p className="text-zinc-300 font-medium text-sm min-w-fit">build in public</p>
            <p className="text-zinc-300 font-medium text-sm w-full">{`${day}/${month}/${year}`} - 10:30</p>
        </div>
    )
}
