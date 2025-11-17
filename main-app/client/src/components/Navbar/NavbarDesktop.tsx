import FooterNavbarDesktop from "./FooterNavbarDesktop";
import LogoNavbarDesktop from "./LogoNavbarDesktop";
import MenuNavbarDesktop from "./MenuNavbarDesktop";

export default function NavbarDesktop() {
  return (
    <div className="w-1/5 h-full border-r border-zinc-700">
      <div className="w-full h-1/6 p-5">
        <LogoNavbarDesktop />
      </div>
      <div className="w-full h-4/6 p-5">
        <MenuNavbarDesktop />
      </div>
      <div className="w-full h-1/6 p-5">
        <FooterNavbarDesktop />
      </div>
    </div>
  )
}
