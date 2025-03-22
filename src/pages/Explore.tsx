import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import apiClient from "../api/tmdbApi";
import Card from "../components/Card";

const Explore = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const { explore } = useParams();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const path = `/discover/${explore}?page=${pageNo}`;
      // console.log("fetching data", path);
      const res = await apiClient.get(path);
      // console.log(res.data.results);
      setData((prev) => [...prev, ...res.data.results]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    // console.log("handleScroll",
    //             {
    //               innerHeight: window.innerHeight,
    //               scrollY: window.scrollY,
    //               bodyOffsetHeight: document.body.offsetHeight,
    //             }
    // );
    if (
      !isLoading &&
      window.innerHeight + window.scrollY > document.body.offsetHeight
    ) {
      setPageNo((prev) => prev + 1);
    }
  };

  // fetch when scroll reaches bottom
  useEffect(() => {
    fetchData();
  }, [pageNo]);

  // fetch when page renders
  useEffect(() => {
    // reset the state
    setData([]);
    setPageNo(1);
    fetchData();
  }, [explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 my-20">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-4">
          Explore {explore} shows
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-5">
          {data?.length > 0 &&
            data.map((item: any) => (
              <Card media_type={explore || "movie"} id={item.id} data={item} />
              // <div key={item.id + "explore"} className="w-1/4 md:w-1/5 lg:w-1/6">
              //   <img src={`${import.meta.env.VITE_IMG_PATH}${item.poster_path}`} alt={item.title + "image"} />
              // </div>
            ))}
        </div>
      </div>
      {isLoading && (
        <motion.div
          className="flex w-full items-center justify-center py-4 my-4"
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
      )}
    </div>
  );
};

export default Explore;
