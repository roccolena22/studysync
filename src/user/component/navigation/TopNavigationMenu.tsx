import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import IconAndName from "../shared/IconAndName";
import ToggleMenu from "./ToggleMenu";
import { useEffect, useState } from "react";
import { DefaultColor } from "../../../shared/models";

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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex space-x-5">
      <div className="hidden md:flex space-x-5">
        <IconAndName
        color={DefaultColor.SECONDARY_COLOR}
          label="dashboard"
          iconName="dashboard"
          pathname="/studysync/"
        />
        <IconAndName
        color={DefaultColor.SECONDARY_COLOR}
          label="events"
          iconName="calendar"
          pathname="/studysync/events"
        />
        <IconAndName
        color={DefaultColor.SECONDARY_COLOR}
          label="network"
          iconName="network"
          pathname="/studysync/network"
        />
      </div>
      <div className="sm:hidden">
        <IconAndName
        color={DefaultColor.SECONDARY_COLOR}
          label="menu"
          iconName="menu"
          onClick={toggleNavigationMenu}
        />
      </div>

      <div className="hidden sm:flex space-x-5">
        <IconAndName
        color={DefaultColor.SECONDARY_COLOR}
          label="account"
          iconName="account"
          pathname="/studysync/account"
        />
        <IconAndName
        color={DefaultColor.SECONDARY_COLOR}
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
