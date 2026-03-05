import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { type Content } from "@tiptap/react";

type SubredditTarget = {
    subreddit: string;
    flairId: string | null;
    flairName: string | null;
    scheduledAt: string | null;
};

type PostType = {
    id: string;
    title: string;
    content: string;
    targets: { subreddit: string, scheduled_at: string }[];
};

type CachedPosts = {
    data: PostType[];
    timestamp: number;
}

type PostsCache = {
    [key: string]: CachedPosts;
}

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
    contentPost: Content;
    setContentPost: Dispatch<SetStateAction<Content>>;
    subredditTargets: SubredditTarget[];
    setSubredditTargets: Dispatch<SetStateAction<SubredditTarget[]>>;
    postsList: PostType[];
    setPostsList: Dispatch<SetStateAction<PostType[]>>;
    postIdSelected: string;
    setPostIdSelected: Dispatch<SetStateAction<string>>;
    // Cache
    postsCache: PostsCache;
    setPostsCache: Dispatch<SetStateAction<PostsCache>>;
    invalidatePostsCache: (period?: string) => void;
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
    const [contentPost, setContentPost] = useState<Content>("");
    const [subredditTargets, setSubredditTargets] = useState<SubredditTarget[]>([]);
    const [postsList, setPostsList] = useState<PostType[]>([]);
    const [postIdSelected, setPostIdSelected] = useState("");
    // Cache
    const [postsCache, setPostsCache] = useState<PostsCache>({});
    // App settings
    const [isRedditButtonActive, setRedditButtonActive] = useState(false);
    const [isDismissPermissionDialogOpen, setDismissPermissionDialogOpen] = useState(false);
    const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [isCancelAccountDialogOpen, setCancelAccountDialogOpen] = useState(false);
    // Payment settings
    const [isCancelSubscriptionDialogOpen, setCancelSubscriptionDialogOpen] = useState(false);

    const invalidatePostsCache = (period?: string) => {
        setPostsCache((prev) => {
            if (!period) return {}; // invalida tutta la cache

            const newCache = { ...prev };
            delete newCache[period];
            return newCache;
        });
    };

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
                postsList,
                setPostsList,
                postIdSelected,
                setPostIdSelected,
                //Cache
                postsCache,
                setPostsCache,
                invalidatePostsCache,
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