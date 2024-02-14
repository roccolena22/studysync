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
import GuestTemplate from "./shared/template/GuestTemplate";
import NetworkPage from "./user/page/NetworkPage";
import Protected from "./Protected";
import { useDispatch, useSelector } from "react-redux";
import DashboardPage from "./user/page/DashboardPage";
import { setNextEvents } from "./redux/slices/nextEventsSlice";
import { useEffect, useState } from "react";
import LoginPage from "./guest/page/LoginPage";
import RegistrationPage from "./guest/page/RegistrationPage";
import RecoveryPasswordPage from "./guest/page/RecoveryPasswordPage";

const Router = () => {
  const loggedUser = useSelector((state) => state.auth.user);
  const events = useSelector((state) => state.events);
  const bookings = useSelector((state) => state.bookings);
  const [userPastEvents, setUserPastEvents] = useState([]);
  const [userActiveEvents, setUserActiveEvents] = useState([]);
  const [allUserEvents, setAllUserEvents] = useState([]);

  const dispatch = useDispatch();

  const SortEvents = async () => {
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
    setUserActiveEvents(activeEventsByUser);

    const pastEventsFiltered = eventsByAuthor.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) < currentDate
    );

    setUserPastEvents(pastEventsFiltered);

    const activeEventUserBooked = eventsByBooked.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) >= currentDate
    );
    setAllUserEvents([...eventsByAuthor, ...eventsByBooked]);
    dispatch(setNextEvents([...activeEventsByUser, ...activeEventUserBooked]));
  };

  useEffect(() => {
    SortEvents();
  }, [events]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route element={<GuestTemplate />}>
          <Route path="/studysync/login" element={<LoginPage />} />
          <Route path="/studysync/registration" element={<RegistrationPage />} />
          <Route path="/studysync/recovery-password" element={<RecoveryPasswordPage />} />
        </Route>
        <Route
          element={
            <Protected>
              <UserTemplate />
            </Protected>
          }
        >
          <Route
            path="/studysync/"
            element={
              <Protected>
                <DashboardPage
                  userActiveEvents={userActiveEvents}
                  userPastEvents={userPastEvents}
                />
              </Protected>
            }
          />
          <Route
            path="/studysync/account"
            element={
              <Protected>
                <AccountPage />
              </Protected>
            }
          />
          <Route
            path="/studysync/events"
            element={
              <Protected>
                <EventsPage 
                  allUserEvents={allUserEvents}
                />
              </Protected>
            }
          />
          <Route
            path="/studysync/network"
            element={
              <Protected>
                <NetworkPage />
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
