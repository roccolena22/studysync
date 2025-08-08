import { useSelector } from "react-redux";
import AccountContentContainer from "../component/AccountContentContainer";
import Badge from "../component/shared/Badge";
import Title from "../component/shared/Title";
import { User } from "../models";

export default function AccountPage(): JSX.Element {
  const loggedUser = useSelector<any, User | undefined>(
    (state) => state.auth.user
  );

  return (
    <>
      {loggedUser && (
        <div className="flex flex-col items-center">
          <Title title="Info Account">
            <Badge text={loggedUser.role} />
          </Title>
          <AccountContentContainer loggedUserId={loggedUser.id} />
        </div>
      )}
    </>
  );
}
