import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import IconAndName from "../shared/IconAndName";
import ToggleMenu from "../navigation/ToggleMenu";
import { useEffect, useState } from "react";

export default function TopNavigationMenu() {
  const [toggleMenuIsOpen, setToggleMenuIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/studysync/login");
  };

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
    <div className="flex space-x-5">
      <div className="hidden md:block md:flex space-x-5">
        <IconAndName label="dashboard" iconName="dashboard" pathname="/studysync/" />
        <IconAndName label="events" iconName="calendar" pathname="/studysync/events" />
        <IconAndName label="network" iconName="network" pathname="/studysync/network" />
      </div>
      <div className="sm:hidden">
        <IconAndName
          label="menu"
          iconName="menu"
          pathname
          onClick={toggleNavigationMenu}
        />
      </div>

      <div className=" hidden sm:block sm:flex space-x-5">
        <IconAndName label="account" iconName="account" pathname="/studysync/account" />
        <IconAndName
          label="logout"
          iconName="logout"
          pathname="/studysync/login"
          onClick={handleLogout}
        />
      </div>
      {toggleMenuIsOpen && (
        <div className="sm:hidden h-32 w-fit z-30 fixed top-20 right-0">
          <ToggleMenu />
        </div>
      )}
    </div>
  );
}
