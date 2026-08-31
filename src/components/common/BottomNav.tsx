import { NavLink } from "react-router-dom";
import homeIcon from "@/assets/icons/homeIcon.svg";
import homeIconActivate from "@/assets/icons/homeIconActivate.svg";
import myPageIcon from "@/assets/icons/myPageIcon.svg";
import myPageIconActivate from "@/assets/icons/myPageIconActivate.svg";
import pensionIcon from "@/assets/icons/pensionIcon.svg";
import pensionIconActivate from "@/assets/icons/pensionIconActivate.svg";
import LoginRequiredModal from "@/components/common/modal/LoginRequiredModal";
import useLoginGuard from "@/hooks/useLoginGuard";

// 사학연금공단 홈페이지 주소
const PENSION_SITE_URL = "https://www.tp.or.kr/tp-kr/intro.do";

const NAV_ITEMS = [
  {
    label: "사학연금공단",
    path: PENSION_SITE_URL,
    icon: pensionIcon,
    activeIcon: pensionIconActivate,
    requireAuth: false,
    isExternal: true,
  },
  {
    label: "HOME",
    path: "/",
    icon: homeIcon,
    activeIcon: homeIconActivate,
    requireAuth: false,
    isExternal: false,
  },
  {
    label: "마이페이지",
    path: "/mypage",
    icon: myPageIcon,
    activeIcon: myPageIconActivate,
    requireAuth: true,
    isExternal: false,
  },
];

const ITEM_CLASS = "flex flex-1 flex-col items-center gap-1";

export default function BottomNav() {
  const { isLoggedIn, isLoginModalOpen, closeLoginModal, goLogin, openLoginModal } =
    useLoginGuard();

  return (
    <>
      <nav className="fixed bottom-0 left-1/2 z-20 flex h-20 w-full max-w-97.5 -translate-x-1/2 items-center rounded-t-3xl border-t border-white/10 bg-card">
        {NAV_ITEMS.map((item) =>
          // 외부 사이트 탭은 새 창으로 이동
          item.isExternal ? (
            <a
              key={item.path}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className={ITEM_CLASS}
            >
              <img src={item.icon} alt="" className="h-8 w-auto" />
              <span className="text-xs text-neutral-400">{item.label}</span>
            </a>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              end
              // 로그아웃 상태에서 로그인 필요 탭 진입 차단
              onClick={(event) => {
                if (!item.requireAuth || isLoggedIn) return;

                event.preventDefault();
                openLoginModal();
              }}
              className={ITEM_CLASS}
            >
              {({ isActive }) => (
                <>
                  <img src={isActive ? item.activeIcon : item.icon} alt="" className="h-8 w-auto" />
                  <span
                    className={`text-xs ${isActive ? "font-bold text-white" : "text-neutral-400"}`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ),
        )}
      </nav>

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onCancel={closeLoginModal}
        onConfirm={goLogin}
      />
    </>
  );
}
