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
import { setNextEvents } from "./redux/slices/nextEventsSlice";
import { useEffect } from "react";

const Router = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.auth.user);
  const events = useSelector((state) => state.events);
  const bookings = useSelector((state) => state.bookings);

  const fetchFollowers = async () => {
    try {
      const followersFromDatabase = await getListFromDatabase("followers");
      dispatch(setFollowers(followersFromDatabase));
    } catch (error) {
      console.error("Error retrieving followers from database", error);
    }
  };

  const handleBookedEvents = async () => {
    const currentDate = new Date();
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

    dispatch(setNextEvents(activeEvents));
  };

  useEffect(() => {
    handleBookedEvents();
  }, [events]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route>
          <Route path="*" element={<ErrorPage loggedUser={loggedUser} />} />
        </Route>
        <Route element={<GuestTemplate />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/recovery-password" element={<RecoveryPassword />} />
        </Route>
        <Route
          element={
            <Protected>
              <UserTemplate />
            </Protected>
          }
        >
          <Route
            path="/"
            element={
              <Protected>
                <DashboardPage
                  loggedUser={loggedUser}
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
              <Protected>
                <AccountPage loggedUser={loggedUser} />
              </Protected>
            }
          />
          <Route
            path="/events"
            element={
              <Protected>
                <EventsPage
                  loggedUser={loggedUser}
                  fetchFollowers={fetchFollowers}
                />
              </Protected>
            }
          />
          <Route
            path="/network"
            element={
              <Protected>
                <NetworkPage
                  loggedUser={loggedUser}
                  fetchFollowers={fetchFollowers}
                  events={events}
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
