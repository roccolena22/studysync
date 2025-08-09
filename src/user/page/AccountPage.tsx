import { useSelector } from "react-redux";
import AccountContentContainer from "../component/AccountContentContainer";
import Badge from "../component/shared/Badge";
import Title from "../component/shared/Title";
import Loader from "../../shared/component/Loader";
import { User } from "../models";
import { useEffect, useState } from "react";

export default function AccountPage(): JSX.Element {
  const loggedUser = useSelector<any, User | undefined>(
    (state) => state.auth.user
  );
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
        <Loader size="h-22 w-22" color="text-cyan-700" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Title title="Info Account">
        <Badge text={loggedUser?.role || ""} />
      </Title>
      {loggedUser && (
        <AccountContentContainer loggedUserId={loggedUser.id} />
      )}
    </div>
  );
}
