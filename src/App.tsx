import { Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Explore from "./pages/Explore";
import MainLayout from "./Layout/MainLayout";
import { useEffect } from "react";
import apiClient from "./api/tmdbApi";
import { useDispatch } from "react-redux";
import { setBannerData } from "./redux/slice/appSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch data from the API and display it in the app
    const fetchTrendingMovies = async () => {
      const response = await apiClient.get("/trending/movie/week");
      // console.log(response.data);
      dispatch(setBannerData(response.data.results));
    };
    fetchTrendingMovies();
  }, []);
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
