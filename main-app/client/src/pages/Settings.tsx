import { Button } from "@/components/ui/button";
import Layout from "../components/layout/Layout";
import { logoutFunction } from "@/api/auth/logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Settings() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        const res = await logoutFunction();
        if (!res.ok) {
            console.log("Logout failed: ", res.error);
            alert("Logout failed");
            return;
        }

        logout();
        navigate("/login");
    }

    return (
        <Layout>
            <div className="w-full h-full flex-col bg-red-700">
                <Button onClick={handleLogout}>
                    Logout button
                </Button>
            </div>
        </Layout>
    )
}
