import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

type SubredditType = {
    id: number;
    name: string;
}

type FlairType = {
    subreddit: string;
    flair: string | null;
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
    subredditsSelected: SubredditType[];
    setSubredditsSelected: Dispatch<SetStateAction<SubredditType[]>>;
    flairsSelected: FlairType[];
    setFlairsSelected: Dispatch<SetStateAction<FlairType[]>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    // Responsive
    const [dashboardSectionMobile, setDashboardSectionMobile] = useState(1);
    const [dashboardSectionDesktop, setDashboardSectionDesktop] = useState(1);
    // Post options
    const [titlePost, setTitlePost] = useState("Nam vitae nunc tellus. Etiam condimentum tristique nisl, eu vehicula");
    const [contentPost, setContentPost] = useState("Etiam vestibulum purus at dui tincidunt, non condimentum arcu tincidunt. Curabitur id quam pharetra, iaculis erat a, aliquet eros. Fusce id aliquam dolor, sed facilisis sem. Aenean mi est, gravida vitae diam vitae, pharetra ornare ipsum. Curabitur lorem nisl, semper et mattis eget, facilisis eu neque. Vestibulum venenatis, sapien vitae");
    const [subredditsSelected, setSubredditsSelected] = useState<SubredditType[]>([
        { id: 123, name: "r/Entrepreneur" },
        { id: 123, name: "r/Entrepreneur" },
        { id: 123, name: "r/Entrepreneur" },
        { id: 123, name: "r/Entrepreneur" },
        { id: 123, name: "r/Entrepreneur" },
        { id: 123, name: "r/Entrepreneur" },
    ]);
    const [flairsSelected, setFlairsSelected] = useState<FlairType[]>([]);

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
                setFlairsSelected
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