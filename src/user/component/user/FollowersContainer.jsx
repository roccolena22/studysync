import React, {  } from "react";
import DiscoverUsers from "./DiscoverUsers";
import ManageUsers from "./ManageUsers";

export default function FollowersContainer({ followers, users, loggedUser }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 pt-6">
      <div className="bg-white w-full p-3 rounded-lg shadow-lg flex justify-center items-center">
        <DiscoverUsers
          loggedUser={loggedUser}
          users={users}
          followers={followers}
        />
      </div>
      <div className="bg-white w-full p-3 rounded-lg shadow-lg flex justify-center items-center">
        <ManageUsers
          users={users}
          followers={followers}
          loggedUser={loggedUser}
        />
      </div>
    </div>
  );
}
