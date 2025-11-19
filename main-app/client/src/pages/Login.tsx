import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import icon from "../assets/icon.png";
import { LogIn } from "lucide-react";

export default function Login() {
    return (
        <div className="w-full h-svh flex flex-col items-center justify-center p-5 gap-3 bg-zinc-800">
            <div className="w-full md:w-1/4 flex items-center justify-center gap-2">
                <img src={icon} alt="postonreddit logo" className="w-5 h-5" />
                <h1 className="text-lg font-bold text-zinc-100">postonreddit</h1>
            </div>
            <div className="w-full md:w-1/4 h-fit flex flex-col items-center justify-start text-center p-5 rounded-xl bg-zinc-900 border border-zinc-700">
                <h1 className="text-zinc-100 font-bold text-lg mb-3">Welcome back</h1>
                <p className="text-zinc-300 font-light text-sm mb-5 text-balance">Login with your Email or Google account</p>
                <Button
                    className="w-full border border-zinc-700 py-6 md:py-0 cursor-pointer"
                    variant="default">
                    G Login with Google
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
                    <LogIn />
                    Login
                </Button>
                <p className="text-zinc-400 text-sm">Don't have an account? <span className="underline"><Link to="/registration">Sign up</Link></span></p>
            </div>
            <p className="md:w-1/4 text-center text-zinc-300 text-sm">By clicking continue, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.</p>
        </div>
    )
}
