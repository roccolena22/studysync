import Badge from "../component/Badge";
import AccountContentContainer from "../component/AccountContentContainer";
import Title from "../component/shared/Title";

export default function AccountPage({ loggedUser, users }) {
  return (
    <div className="flex flex-col items-center">
      <Title title="Info Account">
        <Badge text={loggedUser.role} />
      </Title>
      <AccountContentContainer loggedUser={loggedUser} users={users} />
    </div>
  );
}
