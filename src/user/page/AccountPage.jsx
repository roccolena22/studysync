import AccountContentContainer from "../component/AccountContentContainer";
import Badge from "../component/shared/Badge";
import Title from "../component/shared/Title";

export default function AccountPage({ loggedUser }) {
  return (
    <div className="flex flex-col items-center">
      <Title title="Info Account">
        <Badge text={loggedUser.role} />
      </Title>
      <AccountContentContainer loggedUser={loggedUser} />
    </div>
  );
}
