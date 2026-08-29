import { NavLink } from "react-router-dom";
import homeIcon from "@/assets/icons/homeIcon.svg";
import homeIconActivate from "@/assets/icons/homeIconActivate.svg";
import myPageIcon from "@/assets/icons/myPageIcon.svg";
import myPageIconActivate from "@/assets/icons/myPageIconActivate.svg";
import pensionIcon from "@/assets/icons/pensionIcon.svg";
import pensionIconActivate from "@/assets/icons/pensionIconActivate.svg";

const NAV_ITEMS = [
  { label: "사학연금공단", path: "/pension", icon: pensionIcon, activeIcon: pensionIconActivate },
  { label: "HOME", path: "/", icon: homeIcon, activeIcon: homeIconActivate },
  { label: "마이페이지", path: "/mypage", icon: myPageIcon, activeIcon: myPageIconActivate },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 flex h-20 w-full max-w-97.5 -translate-x-1/2 items-center rounded-t-3xl border-t border-white/10 bg-card">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end
          className="flex flex-1 flex-col items-center gap-1"
        >
          {({ isActive }) => (
            <>
              <img src={isActive ? item.activeIcon : item.icon} alt="" className="h-8 w-auto" />
              <span className={`text-xs ${isActive ? "font-bold text-white" : "text-neutral-400"}`}>
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
