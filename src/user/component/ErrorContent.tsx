import React from "react";
import { Link } from "react-router-dom";
import Button from "../../shared/component/Button";
import { useSelector } from "react-redux";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ErrorContent(): JSX.Element {
  const loggedUser = useSelector((state: any) => state.auth.user) as User | null;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <p className="text-lg text-cyan-700 pb-4">Oops!</p>
        <p>Sorry, an unexpected error has occurred.</p>
        {loggedUser ? (
          <p>Do you want to return to the Dashboard?</p>
        ) : (
          <p>Do you want to return to the login page?</p>
        )}
      </div>
      <div className="flex justify-center pt-4">
        <Link to={loggedUser ? "/studysync" : "/studysync/login"}>
          <Button name={loggedUser ? "Dashboard" : "Login"} />
        </Link>
      </div>
    </div>
  );
}
