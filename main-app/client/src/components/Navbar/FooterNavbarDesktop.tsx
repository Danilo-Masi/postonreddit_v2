import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function FooterNavbarDesktop() {

    const [email, setEmail] = useState("danilomani999@gmail.com");

    return (
        <div className="w-full h-full flex items-center justify-start p-3 rounded-xl gap-3 bg-zinc-800 hover:bg-zinc-700">
            <Avatar className="rounded-md w-auto h-full">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
                <p className="text-sm font-bold text-zinc-200">dmasiii</p>
                <p className="text-sm font-light text-zinc-400">{email.slice(0, 17).concat("...")}</p>
            </div>
        </div>
    )
}
