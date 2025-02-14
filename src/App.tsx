import { Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Explore from "./pages/Explore";
import MainLayout from "./Layout/MainLayout";
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:explore" element={<Explore />}>
          <Route path=":id" element={<Details />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
