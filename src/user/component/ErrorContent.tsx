import React from "react";
import { Link } from "react-router-dom";
import Button from "../../shared/component/Button";
import { useSelector } from "react-redux";
import { User } from "../models";
import { DefaultColor } from "../../shared/models";

export default function ErrorContent(): JSX.Element {
  const loggedUser = useSelector((state: any) => state.auth.user) as User | null;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <p className={`text-lg text-${DefaultColor.PRIMARY_COLOR} pb-4`}>Oops!</p>
        <p>Sorry, an unexpected error has occurred.</p>
        {loggedUser ? (
          <p>Do you want to return to the Dashboard?</p>
        ) : (
          <p>Do you want to return to the login page?</p>
        )}
      </div>
      <div className="flex justify-center pt-4">
        <Link to={loggedUser ? "/studysync" : "/studysync/login"}>
          <Button label={loggedUser ? "Dashboard" : "Login"} />
        </Link>
      </div>
    </div>
  );
}
