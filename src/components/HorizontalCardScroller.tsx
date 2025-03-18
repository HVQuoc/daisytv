import { useRef } from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface HorizontalCardScrollerProps {
  listData: any[];
  heading: string;
}

const HorizontalCardScroller = ({
  listData,
  heading,
}: HorizontalCardScrollerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const handeNextBtn = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 300;
    }
  };
  const handlePrevBtn = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 300;
    }
  };

  if (!listData.length) {
    return null;
  }
  return (
    <div className="container mx-auto px-4 py-4">
      {/* Heading */}
      <h2 className="mt-2 text-3xl font-bold text-gray-900">{heading}</h2>
      <hr className="mb-2 text-gray-400"/>

      {/* Card scroller */}
      <div className="relative group shadow-xl">
        <div
          ref={scrollRef}
          className="carousel-container grid py-2 grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-4 overflow-x-auto transition-all scroll-smooth"
        >
          {listData.map((movie: any) => (
            <Card key={movie.id} id={movie.id} data={movie} />
          ))}
        </div>

        {/* scroll buttons */}
        <div className="group-hover:flex hidden z-10 absolute left-0 top-0 bg-gradient-to-r from-gray-900 to-transparent w-1/20 h-full justify-start items-center">
          <button
            className="text-gray-400 p-2 mx-2 hover:text-white hover:scale-110 text-2xl"
            onClick={handeNextBtn}
          >
            <FaAngleLeft />
          </button>
        </div>
        <div className="group-hover:flex hidden z-10 absolute top-0 right-0 bg-gradient-to-l from-gray-900 to-transparent w-1/20 h-full justify-end items-center">
          <button
            onClick={handlePrevBtn}
            className="text-gray-400 p-2 mx-2 hover:text-white hover:scale-110 text-2xl"
          >
            <FaAngleRight />
          </button>
        </div>
        {/* <div className="absolute top-0 w-full h-17/18 items-center justify-between hidden group-hover:lg:flex"></div> */}
      </div>
    </div>
  );
};

export default HorizontalCardScroller;
