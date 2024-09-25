import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const Root = () => {
  useEffect(() => {
    AOS.init(
      {duration: 2000}
    );
  }, [])
  return (
    <div className="font-raleway">
      <div className="h-16">
      <Navbar></Navbar>
      </div>
      
      <div className="">
      <Outlet></Outlet>
      </div>
      
      <Footer></Footer>
    </div>
  );
};

export default Root;