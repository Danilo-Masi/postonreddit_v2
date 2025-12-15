import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, type KeyboardEvent } from "react";
import { loginFunction } from "../../api/auth/login.ts";
import { z } from "zod";
import { Spinner } from "../ui/spinner.tsx";
import { useAuth } from "@/context/AuthContext.tsx";

export default function LoginOuth() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const emailRef = useRef<HTMLInputElement>(null);

    const loginSchema = z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(5, "Password must be at least 5 characters long"),
    });

    const handleLogin = async () => {
        setError("");

        // Validazione
        const validation = loginSchema.safeParse({ email, password });
        if (!validation.success) {
            setError(validation.error.message[0]);
            return;
        }

        setLoading(true);
        try {
            const result = await loginFunction(email, password);
            if (!result.ok) {
                setError(result.error || "Login failed");
                return;
            }

            login(result.user);
            navigate("/", { replace: true });
        } catch (err: any) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="w-full md:w-1/4 h-fit flex flex-col items-center justify-start text-center p-6 rounded-xl bg-zinc-900 border border-zinc-700 shadow-lg transition-shadow hover:shadow-xl">
            <h1 className="text-zinc-100 font-bold text-lg mb-2">Welcome back</h1>
            <p className="text-zinc-300 font-light text-sm mb-4">Login with your Email</p>
            <Separator className="my-4" />

            <div className="w-full flex flex-col items-start gap-3 mb-6">
                <label className="text-zinc-300 text-sm" htmlFor="email">Email</label>
                <Input
                    id="email"
                    ref={emailRef}
                    autoFocus
                    type="email"
                    placeholder="me@example.com"
                    className="text-zinc-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>

            <div className="w-full flex flex-col items-start gap-3 mb-6">
                <label className="text-zinc-300 text-sm" htmlFor="password">Password</label>
                <Input
                    id="password"
                    type="password"
                    placeholder="*******"
                    className="text-zinc-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>

            {error && (
                <p className="text-red-500 text-sm mb-3 animate-fadeIn">{error}</p>
            )}

            <Button
                disabled={loading}
                variant="outline"
                className="w-full mb-4 py-4 md:py-3 cursor-pointer flex items-center justify-center gap-2 transition-colors hover:bg-zinc-800"
                onClick={handleLogin}>
                {loading ? (
                    <>
                        <Spinner className="w-5 h-5" />
                        Loading...
                    </>
                ) : (
                    <>
                        <LogIn className="w-5 h-5" />
                        Login
                    </>
                )}
            </Button>

            <p className="text-zinc-400 text-sm">
                Don't have an account?{" "}
                <span className="underline hover:text-zinc-100">
                    <Link to="/registration">Sign up</Link>
                </span>
            </p>
        </div>
    );
}