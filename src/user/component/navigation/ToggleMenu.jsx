import { useNavigate } from "react-router-dom";
import IconAndName from "../user/IconAndName";
import { useDispatch } from "react-redux";

export default function ToggleMenu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    return (
        <div className="bg-cyan-700 border-b border-l border-cyan-800 w-full flex space-x-5 p-4 rounded-bl-lg shadow-lg">
            <IconAndName
                label="account"
                iconName="account"
                pathname="/account"
            />
            <IconAndName
                label="logout"
                iconName="logout"
                pathname="/login"
                onClick={handleLogout}
            />
        </div>
    )
}