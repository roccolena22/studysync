import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";
import IconAndName from "../user/IconAndName";

export default function TopNavigationMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="flex space-x-5">
      <div className="hidden md:block md:flex space-x-5">
        <IconAndName
          label="dashboard"
          iconName="dashboard"
          pathname="/"
          isLink="true"
        />
        <IconAndName
          label="network"
          iconName="network"
          pathname="/network"
          isLink="true"
        />
        <IconAndName
          label="calendar"
          iconName="calendar"
          pathname="/calendar"
          isLink="true"
        />
      </div>
      <IconAndName
        label="account"
        iconName="account"
        pathname="/account"
        isLink="true"
      />
      <IconAndName
        label="logout"
        iconName="logout"
        pathname="/login"
        isLink="true"
        onClick={handleLogout}
      />
    </div>
  );
}
