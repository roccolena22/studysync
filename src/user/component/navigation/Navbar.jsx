import { Link } from "react-router-dom";
import TopNavigationMenu from "./TopNavigationMenu";
import AppName from "../../../shared/component/AppName";

export default function Navbar({toggleNavigationMenu}) {
  return (
    <div className="w-full bg-cyan-700 h-20 flex justify-between items-center space-x-4 px-4 mb-8 border-b border-cyan-800">
      <Link to="/dashboard">
        <AppName white />
      </Link>
      <TopNavigationMenu toggleNavigationMenu={toggleNavigationMenu}/>
    </div>
  );
}
