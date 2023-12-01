import Badge from "../component/Badge";
import InfoAccount from "../component/InfoAccount";
import TitlePage from "../component/shared/TitlePage";

export default function Account({loggedUser, users}) {

  return (
    <div className="flex flex-col items-center">
      <TitlePage title="Info Account">
        <Badge text={loggedUser.role} />
      </TitlePage>
      <InfoAccount loggedUser={loggedUser} users={users}/>
    </div>
  );
}
//