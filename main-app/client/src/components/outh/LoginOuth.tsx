import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginFunction } from "../../api/auth/login.ts";
import { z } from "zod";
import { Spinner } from "../ui/spinner.tsx";

export default function LoginOuth() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const loginSchema = z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(5, "Password must be at least 5 characters long"),
    })

    const handleLogin = async () => {
        setError("");

        // TODO: migliorare la validazione con zod
        const validation = loginSchema.safeParse({ email, password });
        if (!validation.success) {
            return setError(validation.error.message[0].toString());
        }
        setLoading(true);
        const result = await loginFunction(email, password);
        setLoading(false);

        if (!result.ok) {
            return setError(result.error)
        }
        navigate("/");
    }

    return (
        <div className="w-full md:w-1/4 h-fit flex flex-col items-center justify-start text-center p-5 rounded-xl bg-zinc-900 border border-zinc-700">
            <h1 className="text-zinc-100 font-bold text-lg mb-3">Welcome back</h1>
            <p className="text-zinc-300 font-light text-sm text-balance">Login with your Email</p>
            <Separator className="my-5" />
            <div className="w-full flex flex-col items-start gap-3 mb-8">
                <p className="text-zinc-300 text-sm">Email</p>
                <Input
                    type="email"
                    placeholder="me@example.com"
                    className="text-zinc-200"
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="w-full flex flex-col items-start gap-3 mb-8">
                <p className="text-zinc-300 text-sm">Password</p>
                <Input
                    type="password"
                    placeholder="*******"
                    className="text-zinc-200"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
                disabled={loading}
                variant="outline"
                className="w-full mb-3 py-6 md:py-0 cursor-pointer"
                onClick={() => handleLogin()}>
                {loading ? (
                    <>
                        <Spinner />
                        Loading
                    </>
                ) : (
                    <>
                        <LogIn />
                        Login
                    </>
                )}
            </Button>
            <p className="text-zinc-400 text-sm">Don't have an account? <span className="underline"><Link to="/registration">Sign up</Link></span></p>
        </div>
    )
}
