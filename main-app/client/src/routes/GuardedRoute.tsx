import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

type AccessLevel = "public" | "auth" | "pro" | "plans";

interface GuardedRouteProps {
    children: ReactNode;
    access: AccessLevel;
}

export default function GuardedRoute({ children, access }: GuardedRouteProps) {
    const { logged, paying, loading } = useAuth();

    if (loading) {
        return (
            <div className="w-full h-svh flex items-center justify-center bg-zinc-900 text-zinc-100 text-xl">
                <Spinner />
            </div>
        );
    }

    // ───────── PUBLIC ─────────
    if (access === "public") {
        if (logged && paying) return <Navigate to="/" replace />;
        if (logged && !paying) return <Navigate to="/plans" replace />;
        return children;
    }

    // ───────── AUTH ─────────
    if (access === "auth") {
        if (!logged) return <Navigate to="/login" replace />;
        return children;
    }

    // ───────── PRO ─────────
    if (access === "pro") {
        if (!logged) return <Navigate to="/login" replace />;
        if (!paying) return <Navigate to="/plans" replace />;
        return children;
    }

    // ───────── PLANS ─────────
    if (access === "plans") {
        if (!logged) return <Navigate to="/login" replace />;
        if (paying) return <Navigate to="/" replace />;
        return children;
    }

    return null;
}