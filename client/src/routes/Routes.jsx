import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Root from "../layouts/Root";
import PrivateRoute from "./PrivateRoute";
import SessionDetails from "../pages/SessionDetails/SessionDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateSession from "../pages/Dashboard/Tutor/CreateSession";
import MyListingSession from "../pages/Dashboard/Tutor/MyListingSession";
import UploadMaterials from "../pages/Dashboard/Tutor/UploadMaterials";
import ViewAllMeterials from "../pages/Dashboard/Tutor/ViewAllMeterials";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AllSessionMaintenance from "../pages/Dashboard/Admin/AllSessionMaintenance";
import CreateNote from "../pages/Dashboard/Student/CreateNote";
import ManagePersonalNotes from "../pages/Dashboard/Student/ManagePersonalNotes";
import BookedSessions from "../pages/Dashboard/Student/BookedSessions";
import AllMaterials from "../pages/Dashboard/Student/AllMaterials";
import TutorRoute from "./TutorRoute";
import AdminRoute from "./AdminRoute";
import ManageAllMeterials from "../pages/Dashboard/Admin/ManageAllMeterials";
import Profile from "../pages/Dashboard/Common/Profile";
import Contact from "../components/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/session/:id",
        element: (
          <PrivateRoute>
            <SessionDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      // Tutor Routes
      {
        index: true,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "create-session",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <CreateSession />
            </TutorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-listing-sessions",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <MyListingSession />
            </TutorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "upload-materials",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <UploadMaterials />
            </TutorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "view-all-meterials",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <ViewAllMeterials />
            </TutorRoute>
          </PrivateRoute>
        ),
      },

      // admin routes
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-session-maintenance",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllSessionMaintenance />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-all-materials",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageAllMeterials />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      // student routes
      {
        path: "create-note",
        element: (
          <PrivateRoute>
            <CreateNote />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-personal-notes",
        element: (
          <PrivateRoute>
            <ManagePersonalNotes />
          </PrivateRoute>
        ),
      },
      {
        path: "booked-sessions",
        element: (
          <PrivateRoute>
            <BookedSessions />
          </PrivateRoute>
        ),
      },
      {
        path: "all-materials",
        element: (
          <PrivateRoute>
            <AllMaterials />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
