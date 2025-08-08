import React, { useEffect, useState } from "react";
import SearchBar from "../shared/SearchBar";
import SingleUserInList from "./SingleUserInList";
import Message from "../../../shared/component/Message";
import { User } from "../../models";
import { getUsersByFilter } from "../../../api/apiUsers";
import { getFollowerRecordsByLinkedField, addFollower, deleteFollower } from "../../../api/apiFollowers";
import { useSelector } from "react-redux";

interface UsersListProps {
  usersToShow: User[];
}

interface FollowState {
  [userId: string]: string | null; // followerRecordId o null
}

interface RootState {
  auth: {
    user: User;
  };
}

export default function UsersList({ usersToShow }: UsersListProps): JSX.Element {
  const loggedUser = useSelector((state: RootState) => state.auth.user);

  const [users, setUsers] = useState<User[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const [followState, setFollowState] = useState<FollowState>({});
  const [loadingFollow, setLoadingFollow] = useState<{ [userId: string]: boolean }>({});

 useEffect(() => {
  async function loadUsers() {
    if (usersToShow.length === 0) {
      setUsers([]);
      setFollowState({});
      return;
    }

    const bookedUserIds = usersToShow.map(b => b.id);
    const formula = `OR(${bookedUserIds.map(id => `{id} = '${id}'`).join(",")})`;

    try {
      const fetchedUsers = await getUsersByFilter(formula);
      setUsers(fetchedUsers);

      // Carica tutti i follower creati dall'utente loggato
      const followersFromMe = await getFollowerRecordsByLinkedField("idFrom", loggedUser.id);

      const newFollowState: FollowState = {};

      fetchedUsers.forEach(user => {
        if (user.id === loggedUser.id) {
          // Non può seguire se stesso
          newFollowState[user.id] = null;
        } else {
          // Trova il record follow se esiste
          const found = followersFromMe.find(f => {
            if (Array.isArray(f.idTo)) {
              return f.idTo.includes(user.id);
            }
            return f.idTo === user.id;
          });
          newFollowState[user.id] = found ? found.id : null;
        }
      });

      setFollowState(newFollowState);

    } catch (error) {
      console.error("Errore nel recupero utenti prenotati o follower:", error);
    }
  }

  loadUsers();
}, [usersToShow, loggedUser.id]);


 const toggleFollow = async (user: User, shouldFollow: boolean) => {
  if (loadingFollow[user.id]) return;

  setLoadingFollow((prev) => ({ ...prev, [user.id]: true }));

  try {
    if (shouldFollow) {
      const res = await addFollower({
        idFrom: [loggedUser.id], 
        idTo: [user.id],      
      });

      if (res.records && res.records.length > 0) {
        setFollowState((prev) => ({ ...prev, [user.id]: res.records[0].id }));
      }
    } else {
      const followerRecordId = followState[user.id];
      if (followerRecordId) {
        await deleteFollower(followerRecordId);
        setFollowState((prev) => ({ ...prev, [user.id]: null }));
      }
    }
  } catch (error) {
    console.error("Errore nel toggle follow", error.response || error);
  } finally {
    setLoadingFollow((prev) => ({ ...prev, [user.id]: false }));
  }
};


  const handleSearch = (dataFromSearch: User[]) => {
    setSearchedUsers(dataFromSearch);
  };

  const sortedUsers = [...users].sort((a, b) => {
    const firstNameComparison = a.firstName.localeCompare(b.firstName);
    return firstNameComparison !== 0
      ? firstNameComparison
      : a.lastName.localeCompare(b.lastName);
  });

  return (
    <div className="w-full">
      {users.length > 0 && (
        <SearchBar
          placeholder="Search for a user based on their name or email"
          data={sortedUsers}
          dataFromSearch={handleSearch}
        />
      )}
      <div className="pt-6">
        {(searchedUsers.length > 0 ? searchedUsers : sortedUsers).map((user) => (
          <div key={user.id}>
            <SingleUserInList
              user={user}
              isFollowed={followState[user.id] !== null}
              loading={loadingFollow[user.id] || false}
              toggleFollow={toggleFollow}
            />
          </div>
        ))}
        {users.length === 0 && <Message text="No users to show." />}
      </div>
    </div>
  );
}
