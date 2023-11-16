import Badge from "../component/Badge";
import InfoAccount from "../component/InfoAccount";
import TitlePage from "../component/shared/TitlePage";

export default function Account({infoLoggedUser}) {

  return (
    <div className="flex flex-col items-center">
      <TitlePage title="Info Account">
        <Badge text={infoLoggedUser.role} />
      </TitlePage>
      <InfoAccount infoLoggedUser={infoLoggedUser} />
    </div>
  );
}
//