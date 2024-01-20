import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AccountPage from "./user/page/AccountPage";
import ErrorPage from "./user/page/error-page";
import UserTemplate from "./shared/template/UserTemplate";
import EventsPage from "./user/page/EventsPage";
import Login from "./guest/page/Login";
import GuestTemplate from "./shared/template/GuestTemplate";
import Registration from "./guest/page/Registration";
import NetworkPage from "./user/page/NetworkPage";
import RecoveryPassword from "./guest/page/RecoveryPassword";
import Protected from "./Protected";
import { useDispatch, useSelector } from "react-redux";
import DashboardPage from "./user/page/DashboardPage";
import { getListFromDatabase } from "./api/apiRequest";
import { setFollowers } from "./redux/slices/followersSlice";
import { useEffect, useState } from "react";

const Router = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.auth.user);
  const followers = useSelector((state) => state.followers);
  const events = useSelector((state) => state.events);
  const bookings = useSelector((state) => state.bookings);
  const users = useSelector((state) => state.users);

  const [nextEvents, setNextEvents] = useState([]);
  const currentDate = new Date();

  const handleBookedEvents = async () => {
    const eventsByBooked = events.filter((event) => {
      if (event.bookingsRecordId) {
        return event.bookingsRecordId.some((bookingId) =>
          bookings.some(
            (booking) =>
              bookingId === booking.id && booking.bookedId === loggedUser.id
          )
        );
      }
      return false;
    });
    const eventsByAuthor = events.filter(
      (event) => event.authorId === loggedUser.id
    );

    const activeEventsByUser = eventsByAuthor.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) >= currentDate
    );

    const activeEventUserBooked = eventsByBooked.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) >= currentDate
    );
    const activeEvents = [...activeEventsByUser, ...activeEventUserBooked];

    setNextEvents(activeEvents);
  };

  useEffect(() => {
    handleBookedEvents();
  }, [events]);


  const fetchFollowers = async () => {
    try {
      const followersFromDatabase = await getListFromDatabase("followers");
      dispatch(setFollowers(followersFromDatabase));
    } catch (error) {
      console.error("Error retrieving followers from database", error);
    }
  };
  const isLogged = loggedUser ? true : false
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route>
          <Route path="*" element={<ErrorPage isLogged={isLogged} />} />
        </Route>
        <Route element={<GuestTemplate />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/recovery-password" element={<RecoveryPassword />} />
        </Route>
        <Route
          element={
            <Protected isLogged={isLogged}>
              <UserTemplate />
            </Protected>
          }
        >
          <Route
            path="/"
            element={
              <Protected isLogged={isLogged}>
                <DashboardPage
                  loggedUser={loggedUser}
                  users={users}
                  followers={followers}
                  fetchFollowers={fetchFollowers}
                  events={events}
                  bookings={bookings}
                  nextEvents={nextEvents}
                />
              </Protected>
            }
          />
          <Route
            path="/account"
            element={
              <Protected isLogged={isLogged}>
                <AccountPage loggedUser={loggedUser} users={users} />
              </Protected>
            }
          />
          <Route
            path="/events"
            element={
              <Protected isLogged={isLogged}>
                <EventsPage
                  loggedUser={loggedUser}
                  bookings={bookings}
                  nextEvents={nextEvents}
                  users={users}
                  fetchFollowers={fetchFollowers}
                />
              </Protected>
            }
          />
          <Route
            path="/network"
            element={
              <Protected isLogged={isLogged}>
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
