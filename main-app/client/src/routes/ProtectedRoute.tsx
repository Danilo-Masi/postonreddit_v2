import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();

    // Attendo verifica sessione
    if (loading) {
        return (
            <div className="w-full h-svh flex items-center justify-center bg-zinc-800 text-zinc-200 text-xl">
                <Spinner />
            </div>
        );
    }

    // Non autenticato
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Autenticato
    return children
}
