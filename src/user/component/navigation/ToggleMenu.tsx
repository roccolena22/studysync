import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import IconAndName from "../shared/IconAndName";
import { DefaultColor } from "../../../shared/models";

export default function ToggleMenu(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/studysync/login");
  };

  return (
    <div
  className={`w-full flex space-x-5 p-4 rounded-bl-lg shadow-xl ${DefaultColor.BG_PRIMARY_COLOR}`}
>
  <IconAndName
    color={DefaultColor.SECONDARY_COLOR}
    label="profile"
    iconName="profile"
    pathname={`/studysync/profile`}
  />
      <IconAndName
        label="account"
        iconName="account"
        pathname="/studysync/account"
        color={DefaultColor.SECONDARY_COLOR}
      />
      <IconAndName
        label="logout"
        iconName="logout"
        pathname="/studysync/login"
        onClick={handleLogout}
        color={DefaultColor.SECONDARY_COLOR}
      />
    </div>
  );
}
