import Button from "../../../shared/component/Button";

export default function FollowAndUnfollowButtons ({loggedUser, toggleFollow, user}){
    const isLoggedUser = loggedUser.id === user.id;

    const isFollowed =
    user.followersIds &&
    loggedUser.followingIds &&
    loggedUser.followingIds.some((element) =>
      user.followersIds.includes(element)
    );
    return(
        <>
        {!isLoggedUser &&
            (isFollowed === true ? (
              <Button
                small
                outline
                onClick={() => toggleFollow(user.id, false)}
                name="Unfollow"
              />
            ) : (
              <Button
                small
                onClick={() => toggleFollow(user.id, true)}
                name="Follow"
              />
            ))}
            </>
    )
}