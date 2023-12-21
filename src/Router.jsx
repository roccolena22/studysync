import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from "./user/page/DashboardPage";
import AccountPage from "./user/page/AccountPage";
import ErrorPage from "./user/page/error-page";
import UserTemplate from "./shared/template/userTemplate/UserTemplate";
import CalendarPage from "./user/page/CalendarPage";
import Login from "./guest/page/Login";
import GuestTemplate from "./shared/template/guestTemplate/guestTemplate";
import Registration from "./guest/page/Registration";
import NetworkPage from "./user/page/NetworkPage";
import RecoveryPassword from "./guest/page/RecoveryPassword";
import Protected from "./Protected";
import { useSelector } from "react-redux";

const Router = () => {
  const loggedUser = useSelector((state) => state.auth.user);
  const followers = useSelector((state) => state.followers);
  const users = useSelector((state)=> state.users);
  const events = useSelector((state)=> state.events);
  const bookings = useSelector((state)=> state.bookings);


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route>
          <Route path="*" element={<ErrorPage isLogged={loggedUser} />} />
        </Route>
        <Route element={<GuestTemplate />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/recovery-password" element={<RecoveryPassword />} />
        </Route>
        <Route
          element={
            <Protected isLogged={loggedUser}>
              <UserTemplate />
            </Protected>
          }
        >
          <Route
            path="/"
            element={
              <Protected isLogged={loggedUser}>
                <DashboardPage loggedUser={loggedUser} users={users} followers={followers} events={events} bookings={bookings} />
              </Protected>
            }
          />
          <Route
            path="/account"
            element={
              <Protected isLogged={loggedUser}>
                <AccountPage loggedUser={loggedUser} users={users}/>
              </Protected>
            }
          />
          <Route
            path="/calendar"
            element={
              <Protected isLogged={loggedUser}>
                <CalendarPage loggedUser={loggedUser} bookings={bookings} events={events}/>
              </Protected>
            }
          />
          <Route
            path="/network"
            element={
              <Protected isLogged={loggedUser}>
                <NetworkPage loggedUser={loggedUser} followers={followers} events={events} users={users}  bookings={bookings}/>
              </Protected>
            }
          />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;