import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TabMenu from "../component/navigation/TabMenu";
import EventsListContainer from "../component/EventsListContainer";
import TitlePage from "../component/shared/TitlePage";
import GadgetBox from "../component/shared/GadgetBox";
import DiscoverUsers from "../component/user/DiscoverUsers";
import ManageUsers from "../component/user/ManageUsers";
import { addToDatabase, getFromDatabase } from "../../api/apiRequest";
import { addFollower, removeFollower, setFollowers } from "../../redux/followersSlice";

export default function Dashboard({ loggedUser, users, followers }) {
  const [indexSection, setIndexSection] = useState(0);

  console.log(users);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const followersFromDatabase = await getFromDatabase("followers");
        const arrayWithFieldsOnly = followersFromDatabase.map((item) => item.fields);
        dispatch(setFollowers(arrayWithFieldsOnly));
      } catch (error) {
        console.error("Errore nel recupero dei follower dal database", error);
      }
    };

    fetchFollowers();
  }, [dispatch]);


  const addFollowers = async (userFollowed) => {
    const followersArray = [
      {
        idFrom: loggedUser.id,
        idTo: userFollowed.id,
      },
    ];

    try {
      await addToDatabase("followers", followersArray);
      dispatch(addFollower(followersArray[0]));

    } catch (error) {
      console.error("Errore nell'aggiunta dei follower", error);
    }
  };

  const removeFollow = (email) => {
    const followerToRemove = followers.find((follower) => follower.email === email);
    if (followerToRemove) {
      try {
        // Rimuovi il follower dal database
        // ...

        dispatch(removeFollower(followerToRemove));
      } catch (error) {
        console.error("Errore nella rimozione del follower", error);
      }
    }
  };

  const handleSections = (index) => {
    setIndexSection(index);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <TitlePage title="Dashboard" />
      <div className="flex w-full space-x-4 pt-6">
        <GadgetBox>
          <DiscoverUsers
            loggedUser={loggedUser}
            users={users}
            addFollowers={addFollowers}
            removeFollow={removeFollow}
          />
        </GadgetBox>
        <GadgetBox>
          <ManageUsers
            followers={followers}
            loggedUser={loggedUser}
            addFollowers={addFollowers}
            removeFollow={removeFollow}
          />
        </GadgetBox>
      </div>
      <div className="w-full pt-10">
        <TabMenu
          firstSectionName="Next events"
          secondSectionName="Past events"
          handleSections={handleSections}
        />
      </div>
      <EventsListContainer
        indexSection={indexSection}
        loggedUser={loggedUser}
      />
    </div>
  );
}
