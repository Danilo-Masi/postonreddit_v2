import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

type SubredditTarget = {
    subreddit: string;
    flairId: string | null;
    flairName: string | null;
    scheduledAt: string | null;
};

type AppContextType = {
    // User info
    userName: string;
    setUserName: Dispatch<SetStateAction<string>>;
    userEmail: string;
    setUserEmail: Dispatch<SetStateAction<string>>;
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
    subredditTargets: SubredditTarget[];
    setSubredditTargets: Dispatch<SetStateAction<SubredditTarget[]>>;
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
    // User info
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    // Responsive
    const [dashboardSectionMobile, setDashboardSectionMobile] = useState(1);
    const [dashboardSectionDesktop, setDashboardSectionDesktop] = useState(1);
    // Post options
    const [titlePost, setTitlePost] = useState("");
    const [contentPost, setContentPost] = useState("");
    const [subredditTargets, setSubredditTargets] = useState<SubredditTarget[]>([]);
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
                // User info
                userName,
                setUserName,
                userEmail,
                setUserEmail,
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
                subredditTargets,
                setSubredditTargets,
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