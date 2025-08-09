import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../shared/component/Loader";
import { DefaultColor } from "../../shared/models";
import { getUserByField } from "../../api/apiUsers";
import { User } from "../models";
import { useSelector } from "react-redux";
import IconAndName from "../component/shared/IconAndName";

interface UserProfilePageProps {
  userId?: string;
}

export default function UserProfilePage({ userId }: UserProfilePageProps): JSX.Element {

  const loggedUser = useSelector((state: any) => state.auth.user) as User;

  const params = useParams<{ id: string }>();
  const id = userId || params.id;

const isOwner = loggedUser.id === id

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (id) {
          const userData = await getUserByField("id", id);
          setUser(userData);
        }
      } catch (error) {
        console.error("Errore nel recupero utente:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader
          size="h-16 w-16"
          color={DefaultColor.TEXT_PRIMARY_COLOR}
        />
      </div>
    );
  }

  if (!user) {
    return <p className="text-center py-10">Utente non trovato</p>;
  }

  return (
    <div className="p-6">

{isOwner && <IconAndName
          iconName="edit"
          label="edit"
        />}

      <h1 className="text-xl font-bold mb-4">
        {user.firstName} {user.lastName}
      </h1>
      <p><strong>Ruolo:</strong> {user.role}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Info</strong> {user.info}</p>
    </div>
  );
}
