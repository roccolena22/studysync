import { Link } from "react-router-dom";
import Button from "../../shared/component/Button";
import AppName from "../../shared/component/AppName";

export default function ErrorPage({ isLogged }) {
  return (
    <div>
      <div className="px-2">
        <AppName />
      </div>
      <div
        id="error-page"
        className="min-h-screen flex items-center justify-center"
      >
        <div>
          <div className="flex flex-col items-center">
            <p className="text-lg text-cyan-700 pb-4">Oops!</p>
            <p>Sorry, an unexpected error has occurred.</p>
            {isLogged ? (
              <p>Do you want to return to the Dashboard?</p>
            ) : (
              <p>Do you want to return to the login page?</p>
            )}
          </div>

          <div className="flex justify-center pt-4">
            <Link to={isLogged ? "/" : "login"}>
              <Button name={isLogged ? "Dashboard" : "Login"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
