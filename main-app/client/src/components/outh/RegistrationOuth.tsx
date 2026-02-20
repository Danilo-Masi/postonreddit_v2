import { Eye, EyeClosed, Lock, Mail, User, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { registrationSchema } from "../../lib/validate";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { registrationFunction } from "@/api/auth/registration";
import { Spinner } from "../ui/spinner";
import { checkoutSession } from "@/api/billing/checkout-session";
import InputBox from "../ui/input-box";
import { useAppContext } from "@/context/AppContext";

export default function RegistrationOuth({ plan }: { plan: string | null }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUserName, setUserEmail } = useAppContext();

    const navigate = useNavigate();
    const { setPending } = useAuth();

    const handleRegister = async () => {
        setError("");
        setLoading(true);
        // 0-Validazione dei dati
        const validation = registrationSchema.safeParse({ name, email, password });
        if (!validation.success) {
            const firstError = validation.error.issues[0];
            setError(firstError.message);
            setLoading(false);
            return;
        }
        try {
            // 1-️Registrazione utente
            const result = await registrationFunction(name, email, password);
            if (!result.ok) {
                console.error("Registration error:", result.error);
                setError("Registration failed");
                setLoading(false);
                return;
            }
            if (!result.user) {
                console.error("User data missing: ", result.error);
                setError("User data missing");
                setLoading(false);
                return;
            }
            // 2-Salvataggio utente e informazioni in context
            setPending();
            setUserName(result.user.email.split("@")[0]);
            setUserEmail(result.user.email);
            // 3-Se non c'è un piano scelto, reindirizzo a /plans
            if (!plan || !["monthly", "lifetime"].includes(plan)) {
                alert("Registration successful!"); // DEBUG ALERT
                navigate("/plans", { replace: true });
                return;
            }
            // 4-Creazione checkout session
            const checkout = await checkoutSession(plan);
            if (!checkout.ok || !checkout.checkoutUrl) {
                console.error("Failed to create checkout sessione: ", checkout.error);
                navigate("/plans", { replace: true });
                return;
            }
            // 4-Redirect al checkout
            window.location.href = checkout.checkoutUrl;
        } catch (err: any) {
            console.error("Server error: ", err);
            setError("Something went wrong. Try again in a minute");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: any) => {
        if (e.key === "Enter") {
            handleRegister();
        }
    };

    return (
        <div className="w-full md:w-1/4 h-fit flex flex-col items-start justify-start gap-8 p-6 rounded-lg bg-zinc-800 border border-zinc-700">
            {/* Title and subtitle */}
            <div className="flex flex-col items-start justify-center  gap-2">
                <h1 className="font-bold text-lg text-zinc-50">Registration</h1>
                <p className="font-light text-sm text-zinc-300">
                    Have alredy an account?{" "}
                    <span className="font-bold text-zinc-200 underline">
                        <Link to="/login">Sign in</Link>
                    </span>
                </p>
            </div>
            {/* Name input */}
            <InputBox>
                <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                <Input
                    id="name"
                    autoComplete="current-name"
                    type="text"
                    autoFocus
                    placeholder="User name"
                    className="pl-10 pr-10 placeholder:text-zinc-400 text-zinc-100 border-zinc-400 focus:border-zinc-100"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </InputBox>
            {/* Email input */}
            <InputBox>
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                <Input
                    id="email"
                    autoComplete="current-email"
                    type="email"
                    placeholder="Email address"
                    className="pl-10 pr-10 placeholder:text-zinc-400 text-zinc-100 border-zinc-400 focus:border-zinc-100"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
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
                    onKeyDown={handleKeyPress}
                />
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
            {/* Button registration */}
            <Button
                type="button"
                onClick={handleRegister}
                disabled={loading}
                aria-busy={loading}
                variant="default"
                className="w-full py-5 md:py-3 transition-all disabled:cursor-not-allowed disabled:opacity-70 bg-orange-600 hover:bg-orange-600/80">
                {loading ? (
                    <>
                        <Spinner className="h-5 w-5" />
                        <span>Creating new account…</span>
                    </>
                ) : (
                    <>
                        <User2 className="h-5 w-5" />
                        <span>Create new account</span>
                    </>
                )}
            </Button>
        </div>
    )
}
