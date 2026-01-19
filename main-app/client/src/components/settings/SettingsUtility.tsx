import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

function SettingsCard({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
    return (
        <div className="rounded-md bg-zinc-800 border border-zinc-700 p-4 flex flex-col gap-5">
            <div className="mb-3">
                <h2 className="text-md font-bold">{title}</h2>
                <p className="text-sm text-zinc-400">{description}</p>
            </div>
            {children}
        </div>
    );
}

function SettingRow({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="max-w-md">
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-zinc-400">{description}</p>
            </div>
            {children}
        </div>
    );
}

function DangerRow({ title, description, buttonLabel, onClick }: { title: string, description: string, buttonLabel: string, onClick?: () => void }) {
    return (
        <div className="mt-2 rounded-md border border-red-500/30 bg-red-500/5 p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
                <p className="text-sm font-medium text-red-400">{title}</p>
                <p className="text-xs text-red-400/80">{description}</p>
            </div>
            <Button
                variant="destructive"
                className="w-full md:w-auto cursor-pointer"
                onClick={onClick}>
                {buttonLabel}
            </Button>
        </div>
    );
}

function LinkRow({ label, href }: { label: string, href: string }) {
    return (
        <a
            href={href}
            className="flex items-center justify-between text-sm hover:underline text-zinc-300"
            target={href.startsWith("https") ? "_blank" : undefined}>
            {label}
            <span className="text-zinc-500"><ArrowRight size={16} /></span>
        </a>
    );
}

export { SettingsCard, SettingRow, DangerRow, LinkRow };