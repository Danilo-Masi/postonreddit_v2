import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

type FlairType = {
    id: string | null;
    name: string | null;
}

type AppContextType = {
    // Responsive
    dashboardSectionMobile: number;
    setDashboardSectionMobile: Dispatch<SetStateAction<number>>;
    dashboardSectionDesktop: number;
    setDashboardSectionDesktop: Dispatch<SetStateAction<number>>;
    // Post options
    titlePost: string;
    setTitlePost: Dispatch<SetStateAction<string>>;
    contentPost: string;
    setContentPost: Dispatch<SetStateAction<string>>;
    subredditsSelected: string[];
    setSubredditsSelected: Dispatch<SetStateAction<string[]>>;
    flairsSelected: FlairType[];
    setFlairsSelected: Dispatch<SetStateAction<FlairType[]>>;
    // App settings
    isRedditButtonActive: boolean;
    setRedditButtonActive: Dispatch<SetStateAction<boolean>>;
    isDismissPermissionDialogOpen: boolean;
    setDismissPermissionDialogOpen: Dispatch<SetStateAction<boolean>>;
    isLogoutDialogOpen: boolean;
    setLogoutDialogOpen: Dispatch<SetStateAction<boolean>>;
    isCancelAccountDialogOpen: boolean;
    setCancelAccountDialogOpen: Dispatch<SetStateAction<boolean>>;
    // Payment settings
    isCancelSubscriptionDialogOpen: boolean;
    setCancelSubscriptionDialogOpen: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    // Responsive
    const [dashboardSectionMobile, setDashboardSectionMobile] = useState(1);
    const [dashboardSectionDesktop, setDashboardSectionDesktop] = useState(1);
    // Post options
    const [titlePost, setTitlePost] = useState("");
    const [contentPost, setContentPost] = useState("");
    const [subredditsSelected, setSubredditsSelected] = useState<string[]>([]);
    const [flairsSelected, setFlairsSelected] = useState<FlairType[]>([]);
    // App settings
    const [isRedditButtonActive, setRedditButtonActive] = useState(false);
    const [isDismissPermissionDialogOpen, setDismissPermissionDialogOpen] = useState(false);
    const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [isCancelAccountDialogOpen, setCancelAccountDialogOpen] = useState(false);
    // Payment settings
    const [isCancelSubscriptionDialogOpen, setCancelSubscriptionDialogOpen] = useState(false);

    return (
        <AppContext.Provider
            value={{
                // Responsive
                dashboardSectionMobile,
                setDashboardSectionMobile,
                dashboardSectionDesktop,
                setDashboardSectionDesktop,
                // Post options
                titlePost,
                setTitlePost,
                contentPost,
                setContentPost,
                subredditsSelected,
                setSubredditsSelected,
                flairsSelected,
                setFlairsSelected,
                // App settings
                isRedditButtonActive,
                setRedditButtonActive,
                isDismissPermissionDialogOpen,
                setDismissPermissionDialogOpen,
                isLogoutDialogOpen,
                setLogoutDialogOpen,
                isCancelAccountDialogOpen,
                setCancelAccountDialogOpen,
                // Payment settings
                isCancelSubscriptionDialogOpen,
                setCancelSubscriptionDialogOpen,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};