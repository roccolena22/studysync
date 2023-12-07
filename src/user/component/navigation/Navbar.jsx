import { Link } from "react-router-dom";
import TopNavigationMenu from "./TopNavigationMenu";
import AppName from "../../../shared/component/AppName";

export default function Navbar() {
  return (
    <div className="w-full bg-cyan-700 h-16 flex justify-between items-center space-x-4 px-4 mb-8 z-50">
      <Link to="/dashboard">
        <AppName white />
      </Link>
      <TopNavigationMenu />
    </div>
  );
}
