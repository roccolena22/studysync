import { Outlet } from "react-router-dom";
import Navbar from "../../../user/component/navigation/Navbar";
import Footer from "../../../user/component/navigation/Footer";

export default function UserTemplate() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-100">
      <div className="sticky top-0 z-10 w-full">
        <Navbar />
      </div>
      <div className="flex-grow w-full lg:w-3/5 pb-8 px-4 md:px-6">
        <Outlet />
      </div>
      <div className="md:hidden sticky bottom-0 z-10 w-full">
        <Footer />
      </div>
    </div>
  );
}
