import { Outlet } from "react-router-dom";
import Navbar from "../components/common/navbar/navbar";
import Footer from "../components/common/footer/Footer";

const Main = () => {
  return (
    <div className="">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;