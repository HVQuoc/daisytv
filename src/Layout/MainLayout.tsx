import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileNavigation from "../components/MobileNavigation";
const MainLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
      <MobileNavigation />
    </main>
  );
};

export default MainLayout;
