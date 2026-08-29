import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 전역 레이아웃 적용 화면 */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<></>} />
        </Route>

        {/* 로그인 화면 */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
