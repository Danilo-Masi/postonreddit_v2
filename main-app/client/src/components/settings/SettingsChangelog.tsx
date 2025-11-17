import { Separator } from "../ui/separator";

const changelogs = [
    { id: 1, title: "lorem ipsum 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque, lectus ut congue placerat, mi lorem faucibus leo, in ullamcorper nunc augue vitae nisl. Suspendisse vel est risus. Donec sollicitudin neque nunc, sit amet mollis nibh lobortis non. Pellentesque lobortis risus id ornare pretium. Nunc eget ullamcorper mi. Praesent molestie." },
    { id: 2, title: "lorem ipsum 2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque, lectus ut congue placerat, mi lorem faucibus leo, in ullamcorper nunc augue vitae nisl. Suspendisse vel est risus. Donec sollicitudin neque nunc, sit amet mollis nibh lobortis non. Pellentesque lobortis risus id ornare pretium. Nunc eget ullamcorper mi. Praesent molestie." },
    { id: 3, title: "lorem ipsum 3", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque, lectus ut congue placerat, mi lorem faucibus leo, in ullamcorper nunc augue vitae nisl. Suspendisse vel est risus. Donec sollicitudin neque nunc, sit amet mollis nibh lobortis non. Pellentesque lobortis risus id ornare pretium. Nunc eget ullamcorper mi. Praesent molestie." },
    { id: 4, title: "lorem ipsum 4", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque, lectus ut congue placerat, mi lorem faucibus leo, in ullamcorper nunc augue vitae nisl. Suspendisse vel est risus. Donec sollicitudin neque nunc, sit amet mollis nibh lobortis non. Pellentesque lobortis risus id ornare pretium. Nunc eget ullamcorper mi. Praesent molestie." },
];

export default function SettingsChangelog() {
    return (
        <div className="w-full md:w-1/2 h-full px-0 md:px-5 py-5 md:py-0">
            <h1 className="font-bold text-xl text-zinc-200">Changelog</h1>
            <p className="font-medium text-sm text-zinc-400 mt-1">Track updates and changes to the platform</p>
            <Separator className="mt-3" />
            <div className="w-full h-fit md:max-h-[85svh] mt-5 overflow-scroll">
                {changelogs.map((log) => (
                    <div className="w-full mb-5 flex flex-col gap-2" key={log.id}>
                        <h1 className="text-xl font-semibold text-zinc-200">{log.title}</h1>
                        <p className="text-md font-medium text-zinc-400">{log.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
