import { Outlet } from "react-router-dom";
import Navbar from "../../user/component/navigation/Navbar";
import Footer from "../../user/component/navigation/Footer";

export default function UserTemplate() {
  return (
    <div data-testid="user-template" className="flex flex-col min-h-screen items-center bg-gray-50 text-gray-700">
      <div className="sticky top-0 z-20 w-full">
        <Navbar />
      </div>
      <div className="flex-grow w-full xl:w-3/5 px-2 sm:px-6 pb-4 md:px-8 lg:px-10 xl:px-0">
        <Outlet />
      </div>
      <div className="md:hidden sticky bottom-0 z-20 w-full">
        <Footer />
      </div>
    </div>
  );
}
