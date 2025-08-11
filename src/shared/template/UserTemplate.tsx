import { Outlet } from "react-router-dom";
import Navbar from "../../user/component/navigation/Navbar";
import Footer from "../../user/component/navigation/Footer";
import { DefaultColor } from "../models";

export default function UserTemplate(): JSX.Element {
  return (
    <div
      className={`flex flex-col min-h-screen items-center text-slate-700 bg-slate-100`}
    >
      <div className="sticky top-0 z-20 w-full">
        <Navbar />
      </div>
      <div className="flex-grow w-full xl:w-3/5 px-4 sm:px-6 pb-4 md:px-8 lg:px-10 xl:px-0">
        <Outlet />
      </div>
      <div className="md:hidden sticky bottom-0 z-20 w-full">
        <Footer />
      </div>
    </div>
  );
}
