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
        <div className="bg-cyan-700 w-full flex space-x-5 p-4 rounded-bl-lg">
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
    )
}