import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }: { children: ReactNode }) {
    const { logged, paying, loading } = useAuth();

    // In stato di caricamento
    if (loading) {
        return (
            <div className="w-full h-svh flex items-center justify-center bg-zinc-800 text-zinc-200 text-xl">
                <Spinner />
            </div>
        );
    }

    // Utente autenticato e con piano attivo
    if (logged && paying) {
        return <Navigate to="/" replace />;
    }

    // Utente autenticato ma senza piano attivo
    if (logged && !paying) {
        return <Navigate to="/plans" replace />;
    }

    // Utente non autenticato
    return children
}
