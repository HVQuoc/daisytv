import { useEffect, useState } from "react";
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
      console.log("fetching data", path);
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
    setData([])
    setPageNo(1)  
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
              <Card id={item.id} data={item} />
              // <div key={item.id + "explore"} className="w-1/4 md:w-1/5 lg:w-1/6">
              //   <img src={`${import.meta.env.VITE_IMG_PATH}${item.poster_path}`} alt={item.title + "image"} />
              // </div>
            ))}
        </div>
      </div>
      {isLoading && (
        <div className="flex w-full items-center justify-center py-4 my-4">
          <p className="text-2xl">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
