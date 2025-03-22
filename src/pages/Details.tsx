import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import useFetch from "../hooks/useFetch";
import HorizontalCardScroller from "../components/HorizontalCardScroller";
import CircleScore from "../components/CircleScore";
import { useEffect } from "react";
import useFetchDetails from "../hooks/useFetchDetails";

const Details = () => {
  const params = useParams();
  const { data } = useFetchDetails({
    endpoint: `/${params.explore}/${params.id}`,
  });
  console.log("data", data);
  const { data: castData } = useFetchDetails({
    endpoint: `/${params.explore}/${params.id}/credits`,
  });
  const { data: similarData = [] } = useFetch({
    endpoint: `/${params.explore}/${params.id}/similar`,
  });
  // console.log("data", castData);
  const duration = Number(data?.runtime / 60)
    .toFixed(2)
    .split(".");
  const noImageUrl = import.meta.env.VITE_NO_IMAGE_URL;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to top smoothly on load
  }, [params.id]);

  if (!data)
    return (
      <motion.div
        className="flex w-full h-screen items-center justify-center py-4 my-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-2xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.5,
          }}
        >
          Loading...
        </motion.p>
      </motion.div>
    );
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={params.id + "details"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* background image */}
        <motion.div
          className="relative w-full h-[200px] lg:h[350px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="h-full w-full">
            <img
              src={import.meta.env.VITE_IMG_PATH + data?.backdrop_path}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute w-full h-full top-0 bg-gradient-to-t from-black to-transparent"></div>
        </motion.div>

        {/* details section */}
        <motion.div
          key={params.id + "section"}
          className="container mx-auto px-4 flex flex-col lg:flex-row gap-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* poster */}
          <div className="-mt-20 lg:-mt-28 relative">
            <img
              src={import.meta.env.VITE_IMG_PATH + data?.poster_path}
              className="w-full h-full lg:w-60 lg:h-86 rounded-lg shadow-xl object-cover"
            />
          </div>

          {/* details */}
          <div className="w-full">
            <div className="py-2 my-2">
              <h2 className="font-bold text-2xl">
                {data?.title || data?.name}
              </h2>
              <p className="text-gray-500">{data?.tagline}</p>
              <div className="my-2 flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span>Score</span>
                  <CircleScore score={data.vote_average * 10} />
                </div>
                <span>|</span>
                {data.runtime && (
                  <p>
                    Duration: {duration[0]}h{" "}
                    {Math.floor((Number(duration[1]) * 60) / 100)}m
                  </p>
                )}
              </div>
            </div>
            <hr className="text-gray-400" />
            <div className="py-2 my-2">
              <h3 className="font-bold text-xl">Overview</h3>
              <div className="flex flex-col lg:flex-row justify-between gap-2 my-2">
                <p className="lg:max-w-[60ch]">{data?.overview}</p>
                {/* companies */}
                <div className="flex gap-2 items-center">
                  {data?.production_companies.map((c: any) => (
                    <div key={c.id} className="max-w-24 text-center">
                      <img
                        
                        src={c.logo_path?import.meta.env.VITE_IMG_PATH + c.logo_path: noImageUrl}
                        alt={c.name}
                      />
                      <p>{c.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="text-gray-400" />
              <div className="flex items-center text-center gap-2 my-2">
                <p>Status: {data?.status}</p>
                <span>|</span>
                <p>
                  Release Date:{" "}
                  {moment(data?.release_date).format("MMM DD, YYYY")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* cast */}
        <motion.div
          key={params.id}
          className="container mx-auto px-4 my-2"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-bold text-xl">Cast</h3>
          <hr className="text-gray-400" />
          <div className="overflow-x-auto">
            <div className="flex gap-2 my-2">
              {castData?.cast.map((c: any) => (
                <div
                  key={c.id}
                  className="min-w-1/4 max-w-1/4 md:min-w-1/6 md:max-w-1/6 lg:min-w-1/8 h-full text-center"
                >
                  <img
                    src={c.profile_path? import.meta.env.VITE_IMG_PATH + c.profile_path: noImageUrl}
                    alt={c.name}
                    className="rounded-lg w-full h-full object-cover"
                  />
                  <p>{c.name}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* similar movies */}
        <HorizontalCardScroller
          media_type={params.explore || "movie"}
          listData={similarData}
          heading="Similar In Genre"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Details;
