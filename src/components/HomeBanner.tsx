import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const HomeBanner = () => {
  const [currentMovie, setCurrentMovie] = useState(0);
  const bannerData = useSelector((state: RootState) => state.app.bannerData);

  const handleNextMovie = () => {
    console.log("next movie", currentMovie);
    setCurrentMovie((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
  };

  const handlePrevMovie = () => {
    console.log("prev movie");
    setCurrentMovie((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextMovie();
    }, 4000);
    return () => clearInterval(interval);
  });
  //   console.log("homebanner", bannerData);
  return (
    <section className="w-full h-full">
      <div className="flex min-h-full h-[100vh] overflow-hidden">
        {bannerData.map((movie: any) => (
          <div
            className="min-w-full relative group transition-all duration-500 ease-out"
            key={movie.id + "banner"}
            style={{
              transform: `translateX(-${currentMovie * 100}%)`,
            }}
          >
            <div className="h-full w-full">
              <img
                src={`${import.meta.env.VITE_IMG_PATH}${movie.backdrop_path}`}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
            </div>
            {/* filter of image */}
            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

            {/* banner buttons */}
            <div className="absolute top-0 p-0 m-0 w-full h-full justify-between hidden group-hover:flex">
              <button
                className="text-gray-400 px-2 hover:text-white hover:scale-110 text-4xl"
                onClick={handlePrevMovie}
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={handleNextMovie}
                className="text-gray-400 px-2 hover:text-white hover:scale-110 text-4xl"
              >
                <FaAngleRight />
              </button>
            </div>

            <AnimatePresence>
              {/* movie details */}
              <motion.div
                className="container mx-auto px-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute bottom-10 py-4 w-3/4 lg:max-w-2/3 text-neutral-100">
                  <motion.h2
                    className="text-4xl py-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {movie?.title || movie?.name}
                  </motion.h2>
                  <motion.p
                    className="text-lg my-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    {movie.overview}
                  </motion.p>
                  <motion.div
                    className="flex items-center gap-2 my-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <p>Score: {Number(movie.vote_average).toFixed(2)}</p>
                    <span>|</span>
                    <p>View: {Number(movie.popularity).toFixed(0)}</p>
                  </motion.div>
                  <motion.button
                    className="bg-orange-600 hover:bg-gradient-to-r from-red-600 font-bold to-orange-700 hover:scale-105 text-neutral-100 px-4 py-2 my-4 rounded-sm shadow-md transition-all cursor-pointer"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    Play Now
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeBanner;
