import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
