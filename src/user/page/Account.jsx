import Badge from "../component/Badge";
import InfoAccount from "../component/InfoAccount";
import Title from "../component/shared/Title";

export default function Account({ loggedUser, users }) {
  return (
    <div className="flex flex-col items-center">
      <Title title="Info Account">
          <Badge text={loggedUser.role} />
      </Title>
      <InfoAccount loggedUser={loggedUser} users={users} />
    </div>
  );
}
//
