import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Diagnosis from "./pages/Diagnosis/Diagnosis";
import DiagnosisResult from "./pages/Diagnosis/DiagnosisResult";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Mypage from "./pages/Mypage/Mypage";
import Myplan from "./pages/Mypage/Myplan";
import PrivateInfoEdit from "./pages/Mypage/PrivateInfoEdit";
import ProfileEdit from "./pages/Mypage/ProfileEdit";
import PayoutScenario from "./pages/PayoutScenario/PayoutScenario";
import PayoutScenarioResult from "./pages/PayoutScenario/PayoutScenarioResult";
import Reemployment from "./pages/Reemployment/Reemployment";
import ReemploymentDetail from "./pages/Reemployment/ReemploymentDetail";
import ReemploymentResult from "./pages/Reemployment/ReemploymentResult";
import RetirementPlan from "./pages/RetirementPlan/RetirementPlan";
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
          <Route path="/mypage/plan" element={<Myplan />} />
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
        <Route path="/reemployment" element={<Reemployment />} />
        <Route path="/reemployment/result" element={<ReemploymentResult />} />
        <Route path="/reemployment/detail" element={<ReemploymentDetail />} />
        <Route path="/retirement-plan" element={<RetirementPlan />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/diagnosis/result" element={<DiagnosisResult />} />

        {/* 마이플랜에서 진입하는 저장 결과 화면 */}
        <Route path="/pension-scenario/result/:id" element={<SimulationResult />} />
        <Route path="/pension-scenario/detail/:id" element={<SimulationDetail />} />
        <Route path="/payout-scenario/result/:id" element={<PayoutScenarioResult />} />
        <Route path="/reemployment/detail/:id" element={<ReemploymentDetail />} />
        <Route path="/retirement-plan/:id" element={<RetirementPlan />} />
        <Route path="/diagnosis/result/:id" element={<DiagnosisResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
