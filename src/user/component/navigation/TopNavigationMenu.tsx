import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import IconAndName from "../shared/IconAndName";
import ToggleMenu from "./ToggleMenu";
import { useEffect, useState } from "react";

export default function TopNavigationMenu(): JSX.Element {
  const [toggleMenuIsOpen, setToggleMenuIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(logout());
    navigate("/studysync/login");
  };

  const toggleNavigationMenu = (): void => {
    setToggleMenuIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth <= 640) {
        setToggleMenuIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex space-x-5">
      <div className="hidden md:block md:flex space-x-5">
        <IconAndName
          label="dashboard"
          iconName="dashboard"
          pathname="/studysync/"
        />
        <IconAndName
          label="events"
          iconName="calendar"
          pathname="/studysync/events"
        />
        <IconAndName
          label="network"
          iconName="network"
          pathname="/studysync/network"
        />
      </div>
      <div className="sm:hidden">
        <IconAndName
          label="menu"
          iconName="menu"
          onClick={toggleNavigationMenu}
        />
      </div>

      <div className="hidden sm:block sm:flex space-x-5">
        <IconAndName
          label="account"
          iconName="account"
          pathname="/studysync/account"
        />
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
