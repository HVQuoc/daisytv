import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <main>
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;
