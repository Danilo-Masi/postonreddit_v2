import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ProfileBadge() {
    return (
        <div className="w-full md:w-fit h-fit flex items-center justify-start p-3 md:px-5 rounded-xl gap-3 bg-zinc-800">
            <Avatar className="rounded-md w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
                <p className="text-sm font-bold text-zinc-200">dmasiii</p>
                <p className="text-sm font-light text-zinc-400">danilomasi99gmail.com</p>
            </div>
        </div>
    )
}
