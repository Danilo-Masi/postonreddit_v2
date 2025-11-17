import icon from "../../assets/icon.png";

export default function LogoNavbarDesktop() {
    return (
        <div className="w-full h-full flex items-center gap-2">
            <img src={icon} alt="logo postonreddit" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-zinc-100">postonreddit</h1>
        </div>
    )
}
