import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import IconAndName from "../shared/IconAndName";

export default function ToggleMenu(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/studysync/login");
  };

  return (
    <div className="bg-cyan-700 border-b border-l border-cyan-800 w-full flex space-x-5 p-4 rounded-bl-lg shadow-xl">
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
  );
}
