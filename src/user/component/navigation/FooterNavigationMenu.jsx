import { Link, useLocation } from "react-router-dom";
import Icon from "../../../shared/component/Icon";

export default function FooterNavigationMenu() {
  const location = useLocation();

  return (
    <div className="flex justify-around w-full">
      <div>
        <Link to="/" className="flex flex-col items-center">
          <Icon
            color="white"
            name="dashboard"
            style={`rounded-full w-8 h-8 p-2 hover:border border-full border-rose-400 ${
              location.pathname === "/" ? "bg-rose-400" : ""
            }`}
          />
          <p className="text-[13px] text-white">Dashboard</p>
        </Link>
      </div>
      <div>
        <Link to="/network" className="flex flex-col items-center">
          <Icon
            color="white"
            name="network"
            style={`rounded-full w-8 h-8 p-2 hover:border border-full border-rose-400 ${
              location.pathname === "/network" ? "bg-rose-400" : ""
            }`}
          />
          <p className="text-[13px] text-white">Network</p>
        </Link>
      </div>
      <div>
        <Link to="/calendar" className="flex flex-col items-center">
          <Icon
            color="white"
            name="calendar"
            style={`rounded-full w-8 h-8 p-2 hover:border border-full border-rose-400 ${
              location.pathname === "/calendar" ? "bg-rose-400" : ""
            }`}
          />
          <p className="text-[13px] text-white">Calendar</p>
        </Link>
      </div>
    </div>
  );
}
