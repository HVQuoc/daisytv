import { useState, FormEvent, useEffect } from "react";
import apiClient from "../api/tmdbApi";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";

const Search = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [enableFilter, setEnableFilter] = useState(false);
  const [enableSorting, setEnableSorting] = useState(false);
  const [score, setScore] = useState(5);
  const [nameSort, setNameSort] = useState<"asc" | "desc">("asc");
  const [scoreSort, setScoreSort] = useState<"asc" | "desc">("desc");
  const [data, setData] = useState<any[]>([]);

  const fetchData = async (searchQuery: string) => {
    try {
      // console.log(location.search.split("=")[1])
      // const searchQuery = location?.search?.split("=")[1] || "";
      const response = await apiClient.get(
        `/search/collection?query=${searchQuery}&page=1`
      );
      console.log("search page", response.data.results);
      setData(response.data.results);
    } catch (err) {
      console.log("search page", err);
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log("handle search", searchTerm);
    if (searchTerm === "") return;
    fetchData(searchTerm);
  };

  const refractorSeacrh = (originalString: string) => {
    return originalString.split("=")[1].split("%20").join(" ");
  };

  useEffect(() => {
    if (location.search) {
      const searchTermFromPath = refractorSeacrh(location.search);
      setSearchTerm(searchTermFromPath);
      fetchData(searchTermFromPath);
    }
  }, [location]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 py-20 mx-auto container px-4">
      {/* left panel */}
      <div className="col-span-1 mr-2 border-r-1 border-gray-300 pr-2">
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="w-full py-1 px-2 border border-gray-500 focus:outline-orange-600 rounded-lg"
            placeholder="Movie, TV or key words,..."
          />
          <button className="rounded-lg py-1 px-2 bg-orange-600 hover:scale-105 hover:bg-gradient-to-r from-red-600 to-orange-600 transition-all duration-500 text-white">
            Search
          </button>
        </form>

        {/* filter */}
        <div>
          <div>
            <button
              onClick={() => setEnableFilter((prev) => !prev)}
              className={
                "text-md mb-2 text-white bg-amber-500 rounded-md px-2" +
                (enableFilter ? " px-2 " : "")
              }
            >
              Filters
            </button>
            <span className="px-2 text-gray-500">{enableFilter ? "On" : "Off"}</span>
          </div>
          {enableFilter && (
            <div>
              <label className="text-sm mb-2">Score</label>
              <input
                type="range"
                min="1"
                max="10"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-full cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between w-full text-sm text-gray-600">
                {Array.from({ length: 10 }, (_, i) => (
                  <span
                    onClick={() => setScore(i + 1)}
                    key={i}
                    className="w-6 text-center cursor-pointer"
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sorting Options */}
        <div className="my-4">
          <div className="w-full">
            <button
              onClick={() => setEnableSorting((prev) => !prev)}
              className={
                "cursor-pointer text-white text-md bg-amber-500 rounded-md px-2"
              }
            >
              Sorting
            </button>
            <span className="px-2 text-gray-500">{enableSorting ? "On" : "Off"}</span>
          </div>
          {enableSorting && (
            <div className="flex gap-4">
              <div>
                <label className="text-sm font-medium block">
                  Sort by name:
                </label>
                <select
                  value={nameSort}
                  onChange={(e) =>
                    setNameSort(e.target.value as "asc" | "desc")
                  }
                  className="border p-1 rounded mt-1"
                >
                  <option value="asc">A → Z</option>
                  <option value="desc">Z → A</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block">
                  Sort by score:
                </label>
                <select
                  value={scoreSort}
                  onChange={(e) =>
                    setScoreSort(e.target.value as "asc" | "desc")
                  }
                  className="border p-1 rounded mt-1"
                >
                  <option value="desc">High → Low</option>
                  <option value="asc">Low → High</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* right panel */}
      <div className="col-span-3">
        {data.length === 0 && (
          <p className="font-semibold text-md">
            No item to display. Try typing some keyword.
          </p>
        )}
        {/* <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-5"> */}
        <div className="flex flex-wrap gap-5">
          {data?.length > 0 &&
            data.map((item: any) => (
              <Card key={item.id} id={item.id} data={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
