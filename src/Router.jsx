import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AccountPage from "./user/page/AccountPage";
import ErrorPage from "./user/page/error-page";
import UserTemplate from "./shared/template/userTemplate/UserTemplate";
import EventsPage from "./user/page/EventsPage";
import Login from "./guest/page/Login";
import GuestTemplate from "./shared/template/guestTemplate/guestTemplate";
import Registration from "./guest/page/Registration";
import NetworkPage from "./user/page/NetworkPage";
import RecoveryPassword from "./guest/page/RecoveryPassword";
import Protected from "./Protected";
import { useDispatch, useSelector } from "react-redux";
import DashboardPage from "./user/page/DashboardPage";
import { getListFromDatabase } from "./api/apiRequest";
import { setFollowers } from "./redux/slices/followersSlice";

const Router = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.auth.user);
  const followers = useSelector((state) => state.followers);
  const events = useSelector((state) => state.events);
  const bookings = useSelector((state) => state.bookings);
  const users = useSelector((state) => state.users);

  const fetchFollowers = async () => {
    try {
      const followersFromDatabase = await getListFromDatabase("followers");
      dispatch(setFollowers(followersFromDatabase));
    } catch (error) {
      console.error("Error retrieving followers from database", error);
    }
  };

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
                <DashboardPage
                  loggedUser={loggedUser}
                  users={users}
                  followers={followers}
                  fetchFollowers={fetchFollowers}
                  events={events}
                  bookings={bookings}
                />
              </Protected>
            }
          />
          <Route
            path="/account"
            element={
              <Protected isLogged={loggedUser}>
                <AccountPage loggedUser={loggedUser} users={users} />
              </Protected>
            }
          />
          <Route
            path="/events"
            element={
              <Protected isLogged={loggedUser}>
                <EventsPage
                  loggedUser={loggedUser}
                  bookings={bookings}
                  events={events}
                  users={users}
                  fetchFollowers={fetchFollowers}
                />
              </Protected>
            }
          />
          <Route
            path="/network"
            element={
              <Protected isLogged={loggedUser}>
                <NetworkPage
                  loggedUser={loggedUser}
                  followers={followers}
                  fetchFollowers={fetchFollowers}
                  events={events}
                  users={users}
                  bookings={bookings}
                />
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
