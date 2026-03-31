import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import App from "../App";
import DashboardLayout from "../layout/DashboardLayout";
import Users from "../components/dashboard/users/Users";
import DashboardHome from "../components/dashboard/home/DashboardHome";
import Settings from "../components/dashboard/settings/Settings";

import Notice from "../components/dashboard/notice/Notice";
import UpdateNotice from "../components/dashboard/notice/UpdateNotice";
import AddNotice from "../components/dashboard/notice/AddNotice";
import PrivetRouter from "../components/shared/PrivetRouter";
import AddCourse from "../components/dashboard/course/AddCourse";
import ManageCourse from "../components/dashboard/course/ManageCourse";
import CourseDetails from "../components/home/CourseDetails";
import Course from "../pages/Course";
import NotFound from "../pages/NotFound";
import Profile from "../components/home/Profile";
import DashBoardProfile from "../components/dashboard/profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "courses",
        element: <Course />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "course/:id",
        element: <CourseDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivetRouter />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "notice",
            element: <Notice />,
          },
          {
            path: "add-notice",
            element: <AddNotice />,
          },
          {
            path: "notice-update/:id",
            element: <UpdateNotice />,
          },
          {
            path: "add-course",
            element: <AddCourse />,
          },
          {
            path: "course",
            element: <ManageCourse />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "profile",
            element: <DashBoardProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
