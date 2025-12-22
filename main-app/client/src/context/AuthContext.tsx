import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { meFunction } from "@/api/user/me";

type User = {
    id: string;
    email: string;
    ispro: boolean; // indica se l'utente ha un piano attivo
};

type AuthStatus = "loading" | "unauthenticated" | "authenticated";
type BillingStatus = "unknown" | "active" | "inactive";

type AuthContextType = {
    user: User | null;
    authStatus: AuthStatus;
    billingStatus: BillingStatus;
    loading: boolean;

    login: (userData: User, hasActivePlan: boolean) => void;
    activateUser: (userData: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    authStatus: "unauthenticated",
    billingStatus: "unknown",
    loading: true,

    login: () => { },
    activateUser: () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
    const [billingStatus, setBillingStatus] = useState<BillingStatus>("unknown");
    const [loading, setLoading] = useState(true);

    // Fetch utente al mount
    useEffect(() => {
        let mounted = true;

        async function fetchUser() {
            try {
                const data = await meFunction();
                if (!mounted) return;

                if (!data?.user) {
                    setUser(null);
                    setAuthStatus("unauthenticated");
                    setBillingStatus("inactive");
                } else {
                    setUser(data.user);
                    setAuthStatus("authenticated");
                    setBillingStatus(data.user.ispro ? "active" : "inactive");
                }
            } catch (error) {
                console.error("Auth fetch error:", error);
                setUser(null);
                setAuthStatus("unauthenticated");
                setBillingStatus("inactive");
            } finally {
                setLoading(false);
            }
        }

        fetchUser();

        return () => { mounted = false; };
    }, []);

    // login dopo login o registrazione
    const login = (userData: User, hasActivePlan: boolean) => {
        setUser(userData);
        setAuthStatus("authenticated");
        setBillingStatus(hasActivePlan ? "active" : "inactive");
    };

    // attivazione utente dopo pagamento
    const activateUser = (userData: User) => {
        setUser(userData);
        setAuthStatus("authenticated");
        setBillingStatus("active");
    };

    const logout = () => {
        setUser(null);
        setAuthStatus("unauthenticated");
        setBillingStatus("inactive");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                authStatus,
                billingStatus,
                loading,
                login,
                activateUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}