import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoSearchOutline, IoPersonOutline } from "react-icons/io5";
import { FormEvent, useState } from "react";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { MdHomeFilled } from "react-icons/md";
export const navigation = [
  { label: "TV Shows", href: "/tv", icon: <PiTelevisionFill /> },
  { label: "Movies", href: "/movie", icon: <BiSolidMoviePlay /> },
];
export const mobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: <MdHomeFilled />,
  },
  ...navigation,
  {
    label: "Search",
    href: "/search",
    icon: <IoSearchOutline />,
  },
];
const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchInput.length > 2) {
      navigate(`/search?q=${searchInput}`);
    }
  };

  return (
    <header className="absolute top-0 py-2 w-full h-16 bg-gradient-to-b from-gray-600 to-transparent text-neutral-200 opacity-75 hover:opacity-100 z-10">
      <div className="container mx-auto px-4 flex items-center h-full w-full">
        {/* Logo */}
        <Link to="/">
          <span className="text-4xl text-orange-600 font-bold">D</span>
          <span className="text-2xl text-orange-600 font-bold">aisyTV</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-2 ml-4 font-bold">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `hover:text-orange-300 ${isActive && "text-orange-400"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Search div */}
        <form
          className="hidden lg:flex border w-md border-gray-400  items-center mx-auto px-2 rounded-lg"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search movies, TV shows..."
            className="w-full bg-transparent px-2 py-1 border-none rounded-lg text-white focus:outline-none"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <button
            type="submit"
            className="bg-transparent text-2xl active:scale-95 cursor-pointer"
          >
            <IoSearchOutline className="text-white" />
          </button>
        </form>

        {/* User div */}
        <div className="ml-auto flex mr-4">
          <div className="bg-gray-400 p-1 rounded-full text-white cursor-pointer active:scale-95 transition-all">
            <IoPersonOutline className="text-xl" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
