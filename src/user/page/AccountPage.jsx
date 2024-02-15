import { useSelector } from "react-redux";
import AccountContentContainer from "../component/AccountContentContainer";
import Badge from "../component/shared/Badge";
import Title from "../component/shared/Title";

export default function AccountPage() {
  const loggedUser = useSelector((state) => state.auth.user);
  console.log(loggedUser)
  return (
    <div className="flex flex-col items-center">
      <Title title="Info Account">
        <Badge text={loggedUser.role} />
      </Title>
      <AccountContentContainer />
    </div>
  );
}
