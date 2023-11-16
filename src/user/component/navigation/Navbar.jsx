import { Link } from "react-router-dom";
import TopNavigationMenu from "./TopNavigationMenu";
import AppName from "../../../shared/component/AppName";

export default function Navbar() {
  return (
    <div className="w-full bg-rose-500 h-16 flex justify-between items-center space-x-4 px-4 mb-8">
      <Link to="/dashboard">
        <AppName white />
      </Link>
      <TopNavigationMenu />
    </div>
  );
}
