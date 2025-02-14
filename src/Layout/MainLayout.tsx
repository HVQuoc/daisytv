import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileNavigation from "../components/MobileNavigation";
const MainLayout = () => {
  return (
    <main >
      <Header />
      <div className="pt-16 px-4 mx-auto">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
};

export default MainLayout;
