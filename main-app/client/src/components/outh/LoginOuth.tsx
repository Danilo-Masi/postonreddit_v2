import { Eye, EyeClosed, Lock, LogIn, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState, type KeyboardEvent } from "react";
import { loginFunction } from "../../api/auth/login.ts";
import { Spinner } from "../ui/spinner.tsx";
import { useAuth } from "@/context/AuthContext.tsx";
import { loginSchema } from "@/lib/validate.ts";
import InputBox from "../ui/input-box.tsx";
import { useAppContext } from "@/context/AppContext.tsx";

export default function LoginOuth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setUserName, setUserEmail } = useAppContext();
    const { setPending, setActive, } = useAuth();

    const handleLogin = async () => {
        setError("");
        setLoading(true);
        // 00-Validazione dei dati
        const validation = loginSchema.safeParse({ email, password });
        if (!validation.success) {
            const firstError = validation.error.issues[0];
            setError(firstError.message);
            setLoading(false);
            return;
        }
        try {
            // 1-Login utente
            const result = await loginFunction(email, password);
            if (!result.ok) {
                console.error("Login error: ", result.error);
                setError("Something went wrong. Please try again later");
                setLoading(false);
                return;
            }
            // 2-Salvataggio utente ed info utente in context
            setPending();
            setUserName(result.user.email.split("@")[0]);
            setUserEmail(result.user.email);
            // 3-Redirect alla pagina corretta
            if (result.hasActivePlan) {
                setActive();
                navigate("/", { replace: true });
            } else {
                navigate("/plans", { replace: true });
            }
        } catch (err: any) {
            console.error("Server error: ", err);
            setError("Something went wrong. Try again in a minute");
            setLoading(false);
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
        <div className="w-full md:w-1/4 h-fit flex flex-col items-start justify-start gap-8 p-6 rounded-lg bg-zinc-800 border border-zinc-700">
            {/* Title and subtitle */}
            <div className="flex flex-col items-start justify-center  gap-2">
                <h1 className="font-bold text-lg text-zinc-50">Sign in</h1>
                <p className="font-light text-sm text-zinc-300">
                    New user?{" "}
                    <span className="font-bold text-zinc-200 underline">
                        <Link to="/registration">Create an account</Link>
                    </span>
                </p>
            </div>
            {/* Email input */}
            <InputBox>
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                <Input
                    id="email"
                    autoComplete="current-email"
                    type="email"
                    autoFocus
                    placeholder="Email address"
                    className="pl-10 pr-10 placeholder:text-zinc-400 text-zinc-100 border-zinc-400 focus:border-zinc-100"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyPress} />
            </InputBox>
            {/* Password input */}
            <InputBox>
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                <Input
                    id="password"
                    autoComplete="current-password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="pl-10 pr-10 placeholder:text-zinc-400 text-zinc-100 border-zinc-400 focus:border-zinc-100"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress} />
                <button
                    type="button"
                    aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    onClick={() => setPasswordVisible(!isPasswordVisible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-100"
                    tabIndex={-1}>
                    {isPasswordVisible ? (
                        <EyeClosed className="h-5 w-5 cursor-pointer" />
                    ) : (
                        <Eye className="h-5 w-5 cursor-pointer" />
                    )}
                </button>
            </InputBox>
            {/* Errors text */}
            {error && (
                <div
                    role="alert"
                    aria-live="assertive"
                    className="min-w-full flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500 animate-fadeIn">
                    <span className="mt-0.5">⚠️</span>
                    <span>{error}</span>
                </div>
            )}
            {/* Button login */}
            <Button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                aria-busy={loading}
                variant="default"
                className="w-full py-5 md:py-3 transition-all disabled:cursor-not-allowed disabled:opacity-70 bg-orange-600 hover:bg-orange-600/80">
                {loading ? (
                    <>
                        <Spinner className="h-5 w-5" />
                        <span>Signing in…</span>
                    </>
                ) : (
                    <>
                        <LogIn className="h-5 w-5" />
                        <span>Login</span>
                    </>
                )}
            </Button>
        </div>
    );
}