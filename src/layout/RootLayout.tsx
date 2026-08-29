import { Outlet } from "react-router-dom";
import BottomNav from "@/components/common/BottomNav";

export default function RootLayout() {
  return (
    <main className="min-h-dvh bg-bg-base">
      <Outlet />
      <BottomNav />
    </main>
  );
}
