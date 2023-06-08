import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HiringPage from "./pages/HiringPage";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<HiringPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;