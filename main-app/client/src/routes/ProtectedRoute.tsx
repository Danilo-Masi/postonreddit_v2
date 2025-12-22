import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { authStatus, billingStatus, loading } = useAuth();

    // 1. Attendo caricamento
    if (loading || authStatus === "loading") {
        return (
            <div className="w-full h-svh flex items-center justify-center bg-zinc-800 text-zinc-200 text-xl">
                <Spinner />
            </div>
        );
    }

    // 2. Non autenticato
    if (authStatus === "unauthenticated") {
        return <Navigate to="/login" replace />;
    }

    // 3. Autenticato ma senza piano
    if (billingStatus !== "active") {
        return <Navigate to="/plans" replace />;
    }

    // 4. Autenticato con piano attivo
    return <>{children}</>;
}