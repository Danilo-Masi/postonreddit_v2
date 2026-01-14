import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PlansRoute({ children }: { children: ReactNode }) {
    const { logged, paying, loading } = useAuth();

    // In stato di caricamento
    if (loading) {
        return (
            <div className="w-full h-svh flex items-center justify-center bg-zinc-900 text-zinc-100 text-xl">
                <Spinner />
            </div>
        )
    }

    // Utente non autenticato
    if (!logged) {
        return <Navigate to="/login" replace />;
    }

    // Utente autenticato ma con piano già attivo
    if (logged && paying) {
        return <Navigate to="/" replace />;
    }

    // Utente autenticato senza piano attivo
    return children;
}
