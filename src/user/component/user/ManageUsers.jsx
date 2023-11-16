import { useState, useEffect } from "react";
import Button from "../../../shared/component/Button";
import Popup from "../shared/Popup";
import FollowerAndFollowed from "./FollowerAndFolowed";

export default function ManageUsers({
  infoLoggedUser,
  combinedArray,
  handleFollow,
  removeFollow,
}) {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [followed, setFollowed] = useState([]);
  const [followers, setFollowers] = useState([]);

  const handlePopup = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  useEffect(() => {
    const currentUser = combinedArray.find(
      (el) => infoLoggedUser.email === el.email
    );

    if (currentUser) {
      setFollowed(currentUser.followed || []);
      setFollowers(currentUser.followers || []);
    }
  }, [infoLoggedUser.email, combinedArray]);

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="flex justify-around w-full pb-4">
          <div className="space-x-1">
            <span className="text-lg font-bold text-gray-700">Followed:</span>
            <span>{followed.length}</span>
          </div>
          <div className="space-x-1">
            <span className="text-lg font-bold text-gray-700">Followers:</span>
            <span>{followers.length}</span>
          </div>
        </div>
        <Button
          name="Manage"
          outline
          large
          className="bg-rose-500 text-white hover:bg-rose-600 hover:border-rose-600"
          onClick={handlePopup}
        />
      </div>

      {popupIsOpen && (
        <Popup handleClose={handlePopup}>
          <FollowerAndFollowed
            followed={followed}
            followers={followers}
            handleFollow={handleFollow}
            removeFollow={removeFollow}
          />
        </Popup>
      )}
    </>
  );
}
