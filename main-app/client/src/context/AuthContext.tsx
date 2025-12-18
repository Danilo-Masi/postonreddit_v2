import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { meFunction } from "@/api/user/me";
type User = {
    id: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (userData: User) => void;
    logout: () => void;
    registration: (userData: User) => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: () => { },
    logout: () => { },
    registration: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function fetchUser() {
            const data = await meFunction();
            if (!mounted) return;

            setUser(data?.user ?? null);
            setLoading(false);
        }

        fetchUser();

        return () => { mounted = false };
    }, []);

    const login = (userData: User) => {
        setUser(userData);
    }

    const logout = () => {
        setUser(null);
    }

    const registration = (userData: User) => {
        setUser(userData);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, registration }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}