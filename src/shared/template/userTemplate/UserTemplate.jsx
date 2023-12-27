import { Outlet } from "react-router-dom";
import Navbar from "../../../user/component/navigation/Navbar";
import Footer from "../../../user/component/navigation/Footer";
import ToggleMenu from "../../../user/component/navigation/ToggleMenu";
import { useState, useEffect } from "react";

export default function UserTemplate() {
  const [toggleMenuIsOpen, setToggleMenuIsOpen] = useState(false);

  const toggleNavigationMenu = () => {
    setToggleMenuIsOpen(!toggleMenuIsOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setToggleMenuIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
  }, []); 

  return (
    <div className="flex flex-col min-h-screen items-center bg-slate-50 text-slate-700">
      <div className="sticky top-0 z-20 w-full">
        <Navbar toggleNavigationMenu={toggleNavigationMenu} />
      </div>
      {toggleMenuIsOpen && (
        <div className="sm:hidden h-32 w-fit z-30 fixed top-20 right-0">
          <ToggleMenu />
        </div>
      )}
      <div className="flex-grow w-full xl:w-3/5 pb-8 px-4 md:px-6">
        <Outlet />
      </div>
      <div className="md:hidden sticky bottom-0 z-20 w-full">
        <Footer />
      </div>
    </div>
  );
}
