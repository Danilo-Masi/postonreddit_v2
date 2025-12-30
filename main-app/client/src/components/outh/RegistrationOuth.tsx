import { CircleUser } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { registrationFunction } from "@/api/auth/registration";
import { Spinner } from "../ui/spinner";
import { checkoutSession } from "@/api/billing/checkout-session";

export default function RegistrationOuth({ plan }: { plan: string | null }) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { setPending } = useAuth();

    const registerSchema = z.object({
        name: z.string().min(2, "Name must be at least 2 characters long"),
        email: z.string().email("Invalid email"),
        password: z.string().min(5, "Password must be at least 5 characters long"),
    });

    const handleRegister = async () => {
        setError("");
        setLoading(true);

        // Validazione
        const validation = registerSchema.safeParse({ name, email, password });
        if (!validation.success) {
            setError(validation.error.message[0]);
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
                return;
            }

            // 2-Salvataggio utente in context
            setPending();

            // 3-Se non c'è un piano scelto, reindirizzo a /plans
            if (!plan || !["monthly", "lifetime"].includes(plan)) {
                alert("Registration successful!"); // Temporany Alert TODO
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
            console.error(err);
            setError("Something went wrong. Try again in a minute");
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
        <div className="w-full md:w-1/4 h-fit flex flex-col items-center justify-start text-center p-5 rounded-xl bg-zinc-900 border border-zinc-700">
            <h1 className="text-zinc-100 font-bold text-lg mb-3">Welcome</h1>
            <p className="text-zinc-300 font-light text-sm text-balance">Create a new account with your Email</p>
            <Separator className="my-5" />
            <div className="w-full flex flex-col items-start gap-3 mb-6">
                <label className="text-zinc-300 text-sm" htmlFor="email">Email</label>
                <Input
                    id="name"
                    autoFocus
                    type="text"
                    placeholder="danilomasiii"
                    className="text-zinc-200"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>
            <div className="w-full flex flex-col items-start gap-3 mb-6">
                <label className="text-zinc-300 text-sm" htmlFor="email">Email</label>
                <Input
                    id="email"
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
                onClick={handleRegister}>
                {loading ? (
                    <>
                        <Spinner className="w-5 h-5" />
                        Loading...
                    </>
                ) : (
                    <>
                        <CircleUser className="w-5 h-5" />
                        Create new account
                    </>
                )}
            </Button>
            <p className="text-zinc-400 text-sm">Have alredy an account? <span className="underline"><Link to="/login">Sign in</Link></span></p>
        </div>
    )
}
