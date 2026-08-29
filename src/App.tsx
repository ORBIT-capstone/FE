import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Mypage from "./pages/Mypage/Mypage";
import PrivateInfoEdit from "./pages/Mypage/PrivateInfoEdit";
import ProfileEdit from "./pages/Mypage/ProfileEdit";
import PayoutScenario from "./pages/PayoutScenario/PayoutScenario";
import PayoutScenarioResult from "./pages/PayoutScenario/PayoutScenarioResult";
import Signup from "./pages/Signup/Signup";
import Simulation from "./pages/PensionScenario/Simulation";
import SimulationDetail from "./pages/PensionScenario/SimulationDetail";
import SimulationResult from "./pages/PensionScenario/SimulationResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 전역 레이아웃 적용 화면 */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<></>} />
          <Route path="/mypage" element={<Mypage />} />
        </Route>

        {/* 전역 레이아웃 미적용 화면 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage/profile" element={<ProfileEdit />} />
        <Route path="/mypage/private-info" element={<PrivateInfoEdit />} />
        <Route path="/pension-scenario" element={<Simulation />} />
        <Route path="/pension-scenario/result" element={<SimulationResult />} />
        <Route path="/pension-scenario/detail" element={<SimulationDetail />} />
        <Route path="/payout-scenario" element={<PayoutScenario />} />
        <Route path="/payout-scenario/result" element={<PayoutScenarioResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
