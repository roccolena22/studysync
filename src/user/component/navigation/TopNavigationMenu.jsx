import { Link, useLocation } from "react-router-dom";
import Icon from "../../../shared/component/Icon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";

export default function TopNavigationMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="flex space-x-6">
      <Link to="/" className="hidden md:block md:flex flex-col items-center">
        <Icon
          name="dashboard"
          style={`rounded-full w-8 h-8 p-2 hover:border border-full border-rose-400 text-white ${
            location.pathname === "/" ? "bg-rose-400" : ""
          }`}
        />
        <p className="text-[13px] text-white">Dashboard</p>
      </Link>
      <Link
        to="/network"
        className="hidden md:block md:flex flex-col items-center"
      >
        <Icon
          name="network"
          style={`rounded-full w-8 h-8 p-2 hover:border border-full border-rose-400 text-white ${
            location.pathname === "/network" ? "bg-rose-400" : ""
          }`}
        />
        <p className="text-[13px] text-white">Network</p>
      </Link>
      <Link
        to="/calendar"
        className="hidden md:block md:flex flex-col items-center"
      >
        <Icon
          name="calendar"
          style={`rounded-full w-8 h-8 p-2 hover:border border-full border-rose-400 text-white ${
            location.pathname === "/calendar" ? "bg-rose-400" : ""
          }`}
        />
        <p className="text-[13px] text-white">Calendar</p>
      </Link>
      <Link to="/account" className="flex flex-col items-center">
        <Icon
          name="account"
          style={`rounded-full w-8 h-8 p-2 hover:border border-full border-rose-400 text-white ${
            location.pathname === "/account" ? "bg-rose-400" : ""
          }`}
        />
        <p className="text-[13px] text-white">Account</p>
      </Link>
      <div className="flex flex-col items-center" onClick={handleLogout}>
        <Icon
          name="logout"
          style={`rounded-full w-8 h-8 p-2 hover:border border-full border-rose-400 text-white ${
            location.pathname === "/login" ? "bg-rose-400" : ""
          }`}
        />
        <p className="text-[13px] text-white">Exit</p>
      </div>
    </div>
  );
}
