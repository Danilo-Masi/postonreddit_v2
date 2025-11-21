import icon from '../../assets/icon.png';

export default function LogoOuth() {
    return (
        <div className="w-full md:w-1/4 flex items-center justify-center gap-2">
            <img src={icon} alt="postonreddit logo" className="w-5 h-5" />
            <h1 className="text-lg font-bold text-zinc-100">postonreddit</h1>
        </div>
    )
}
