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
    const [titlePost, setTitlePost] = useState("Stay up all fuc**ng night");
    const [contentPost, setContentPost] = useState(`I’m 25. Still young, still figuring stuff out, but I know one thing for sure: I’m not about to live a life someone else designed for me. I look around and see friends and family stuck in a world they built for themselves. They hate their alarms, hate every extra minute at work, and spend their weeks just counting down to Friday so they can hit a bar and drink away the stress.
And yet, somehow, they feel the need to tell me how to live. “Get a stable job” they say. “Send your résumé to some soul-sucking company with windowless offices”. But why the hell would I do that? Why would I sign up for a life they obviously hate?
Whoa, whoa, slow down, take your hands off that keyboard! Don’t go typing out some snarky comment just yet. Let me explain. No, I’m not some spoiled rich kid. No, I don’t have a trust fund or some wealthy uncle hooking me up. I pay my own way. I know what it’s like to grind, to make sacrifices. I get that nothing in this world comes for free.
But here’s the thing I can’t shake: how many lives do we get? One. Not one and a half. Not two. Just one. So why the hell would I keep putting my dreams on hold—waiting for summer, for vacation days, for the next weekend? Why wait for the “perfect time” that might never come?
I’ve decided to start now. Tonight, if I have to. Yeah, I’ll lose sleep, but not over some boring project or a dead-end job. I’m losing sleep over something bigger—a passion, a vision, a plan for my life that’s crystal clear in my head. A dream that just needs me to make it real.
So if you’ve read this far, wish me luck. And if you’re anything like me, grab that thing you love and make it happen. And if it doesn’t work out? Screw it—start again!`);
    const [subredditsSelected, setSubredditsSelected] = useState<SubredditType[]>([]);
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
                setFlairsSelected,
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