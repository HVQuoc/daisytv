import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileNavigation from "../components/MobileNavigation";
const MainLayout = () => {
  return (
    <main>
      <Header />
      <div className="min-h-[80vh]"> 
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
};

export default MainLayout;
