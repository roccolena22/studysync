import { useSelector } from "react-redux";
import AccountContentContainer from "../component/AccountContentContainer";
import Badge from "../component/shared/Badge";
import Title from "../component/shared/Title";
import Loader from "../../shared/component/Loader";
import { User } from "../models";
import { useEffect, useState } from "react";
import { DefaultColor } from "../../shared/models";
import Icon from "../../shared/component/Icon";
import { useNavigate } from "react-router-dom";

export default function AccountPage(): JSX.Element {

 const navigate = useNavigate();

  const loggedUser = useSelector((state: any) => state.auth.user) as User;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuliamo attesa dati utente
    if (loggedUser) {
      setLoading(false);
    }
  }, [loggedUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="h-22 w-22" color={DefaultColor.TEXT_PRIMARY_COLOR}
 />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 w-full items-center border-b border-slate-400 pb-2">
        <Icon name="back" onClick={() => navigate(-1)}/>
      <Title title="Info Account">
        <Badge text={loggedUser?.role || ""} />
      </Title>
        </div>
        
      {loggedUser && (
        <AccountContentContainer loggedUserId={loggedUser.id} />
      )}
    </div>
  );
}
