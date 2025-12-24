import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { meFunction } from "@/api/user/me";

type AuthContextType = {
    logged: boolean;
    paying: boolean;
    loading: boolean;
    setPending: () => void;
    setActive: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    logged: false,
    paying: false,
    loading: true,
    setPending: () => { },
    setActive: () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [logged, setLogged] = useState(false);
    const [paying, setPaying] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function fetchMe() {
            const data = await meFunction();
            if (!mounted) return;

            if (!data) {
                setLogged(false);
                setPaying(false);
            } else {
                setLogged(data.logged);
                setPaying(data.paying);
            }

            setLoading(false);
        }

        fetchMe();
        return () => { mounted = false; };
    }, []);

    // Usato dopo login / registration
    const setPending = () => {
        setLogged(true);
        setPaying(false);
    };

    // Usato dopo webhook Stripe / ritorno dal checkout
    const setActive = () => {
        setLogged(true);
        setPaying(true);
    };

    const logout = () => {
        setLogged(false);
        setPaying(false);
    };

    return (
        <AuthContext.Provider
            value={{
                logged,
                paying,
                loading,
                setPending,
                setActive,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}