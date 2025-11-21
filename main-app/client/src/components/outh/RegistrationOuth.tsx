import { CircleUser } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

export default function RegistrationOuth() {
    return (
        <div className="w-full md:w-1/4 h-fit flex flex-col items-center justify-start text-center p-5 rounded-xl bg-zinc-900 border border-zinc-700">
            <h1 className="text-zinc-100 font-bold text-lg mb-3">Welcome</h1>
            <p className="text-zinc-300 font-light text-sm mb-5 text-balance">Create a new account with your Email or Google account</p>
            <Button
                className="w-full border border-zinc-700 py-6 md:py-0 cursor-pointer"
                variant="default">
                G Continue with Google
            </Button>
            <Separator className="my-5" />
            <div className="w-full flex flex-col items-start gap-3 mb-8">
                <p className="text-zinc-300 text-sm">Email</p>
                <Input type="email" placeholder="me@example.com" />
            </div>
            <div className="w-full flex flex-col items-start gap-3 mb-8">
                <p className="text-zinc-300 text-sm">Password</p>
                <Input type="password" placeholder="*******" />
            </div>
            <Button variant="outline" className="w-full mb-3 py-6 md:py-0 cursor-pointer">
                <CircleUser />
                Create a new account
            </Button>
            <p className="text-zinc-400 text-sm">Have alredy an account? <span className="underline"><Link to="/login">Sign in</Link></span></p>
        </div>
    )
}
