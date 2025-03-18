import { mobileNavigation } from "./Header";
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  return (
    <section className="fixed text-neutral-300 bottom-0 p-2 lg:hidden flex justify-around gap-2 h-14 w-full bg-gradient-to-t from-black to-transparent flextext-neutral-200 opacity-75">
      {mobileNavigation.map((item) => (
        <NavLink
          to={item.href}
          key={item.href}
          className={({ isActive }) => `${isActive && "text-orange-400"} flex flex-col items-center justify-center h-full`}
        >
          <div className="text-3xl">{item.icon}</div>
          <p className="text-sm">{item.label}</p>
        </NavLink>
      ))}
    </section>
  );
};

export default MobileNavigation;
