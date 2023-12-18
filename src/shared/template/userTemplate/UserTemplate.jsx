import { Outlet } from "react-router-dom";
import Navbar from "../../../user/component/navigation/Navbar";
import Footer from "../../../user/component/navigation/Footer";
import ToggleMenu from "../../../user/component/navigation/ToggleMenu";
import { useState } from "react";

export default function UserTemplate() {
  const [toggleMenuIsOpen, setToggleMenuIsOpen] = useState(false)

  const toggleNavigationMenu = () => {
    setToggleMenuIsOpen(!toggleMenuIsOpen)
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 text-zinc-700 relative">
      <div className="sticky top-0 z-50 w-full">
        <Navbar toggleNavigationMenu={toggleNavigationMenu} />
      </div>
      <div className="flex-grow w-full lg:w-3/5 pb-8 px-4 md:px-6">
        <Outlet />
      </div>
      <div className="md:hidden sticky bottom-0 z-50 w-full">
        <Footer />
      </div>
      {toggleMenuIsOpen && <div className="sm:hidden h-32 w-fit z-40 absolute right-0 top-20">
        <ToggleMenu />
      </div>}
    </div>
  );
}
