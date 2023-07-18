import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <main className="h-screen overflow-y-hidden">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default MainLayout;
