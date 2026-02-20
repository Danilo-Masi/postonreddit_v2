import { useAppContext } from "@/context/AppContext";

export default function FooterNavbarDesktop() {
    const { userName, userEmail } = useAppContext();
    return (
        <div className="w-full h-full flex items-center justify-start p-3 rounded-xl gap-3 bg-zinc-800">
            <div className="rounded-full w-10 h-10 flex items-center justify-center bg-orange-600">
                <p className="font-bold text-white">{userName.slice(0, 2) || "PR"}</p>
            </div>
            <div className="flex flex-col justify-center">
                <p className="text-sm font-bold text-zinc-200">{userName || "user"}</p>
                <p className="text-sm font-light text-zinc-400">{userEmail || "email@user.com"}</p>
            </div>
        </div>
    )
}
