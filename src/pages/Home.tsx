import { useSelector } from "react-redux";
import HomeBanner from "../components/HomeBanner";
import { RootState } from "../redux/store";
import HorizontalCardScroller from "../components/HorizontalCardScroller";
import useFetch from "../hooks/useFetch";

const Home = () => {
  console.log("Home page", window.innerWidth);
  const bannerData = useSelector((state: RootState) => state.app.bannerData);
  const { data: popularMovies = [] } = useFetch({
    endpoint: "/movie/popular",
  });
  const { data: upComingMovies = [] } = useFetch({
    endpoint: "/movie/upcoming",
  });
  const { data: topRatedMovies = [] } = useFetch({
    endpoint: "/movie/top_rated",
  });
  const { data: popularTVs = [] } = useFetch({
    endpoint: "/tv/popular",
  });
  const { data: airingTodayTVs = [] } = useFetch({
    endpoint: "/tv/airing_today",
  });
  const { data: topRatedTVs = [] } = useFetch({
    endpoint: "/tv/top_rated",
  });
  return (
    <div>
      <HomeBanner />
      {/* Movies carousels */}
      {/* <hr className="text-gray-300" /> */}
      <div>
        <h2 className="bg-gradient-to-b from-gray-500 to-transparent h-28 p-4 flex items-center justify-center text-4xl font-bold">
          Movie Collections
        </h2>
        <HorizontalCardScroller listData={bannerData} heading={"Trending"} />
        <HorizontalCardScroller listData={popularMovies} heading={"Popular"} />
        <HorizontalCardScroller
          listData={upComingMovies}
          heading={"Upcoming"}
        />
        <HorizontalCardScroller
          listData={topRatedMovies}
          heading={"Top Rated"}
        />
        <div className="mt-2 bg-gradient-to-t from-gray-500 to-transparent h-28 p-4"></div>
        {/* <hr className="text-gray-300" /> */}
      </div>

      {/* TVs carousels */}
      <div>
        {/* <hr className="text-gray-300" /> */}
        <h2 className="bg-gradient-to-b from-gray-500 to-transparent h-28 p-4 flex items-center justify-center text-4xl font-bold">
          Explore TV Shows
        </h2>
        <HorizontalCardScroller
          listData={airingTodayTVs}
          heading={"Airing Today"}
        />
        <HorizontalCardScroller listData={popularTVs} heading={"Popular"} />
        <HorizontalCardScroller listData={topRatedTVs} heading={"Top Rated"} />
        <div className="mt-2 bg-gradient-to-t from-gray-500 to-transparent h-28 p-4"></div>
        <hr className="text-gray-300" />
      </div>
    </div>
  );
};

export default Home;
