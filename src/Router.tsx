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
import DashboardPage from "./user/page/DashboardPage";
import LoginPage from "./guest/page/LoginPage";
import RegistrationPage from "./guest/page/RegistrationPage";
import RecoveryPasswordPage from "./guest/page/RecoveryPasswordPage";
import UserProfilePage from "./user/page/UserProfilePagePage";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route element={<GuestTemplate />}>
          <Route path="/studysync/login" element={<LoginPage />} />
          <Route
            path="/studysync/registration"
            element={<RegistrationPage />}
          />
          <Route
            path="/studysync/recovery-password"
            element={<RecoveryPasswordPage />}
          />
        </Route>
        <Route
          element={
            <Protected>
              <UserTemplate />
            </Protected>
          }
        >
          <Route
            path="/studysync"
            element={
              <Protected>
                <DashboardPage />
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
          <Route path="/studysync/profile/:id" element={
            <Protected>
              <UserProfilePage />
            </Protected>} />
          <Route
            path="/studysync/events"
            element={
              <Protected>
                <EventsPage />
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
