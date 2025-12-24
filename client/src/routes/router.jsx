import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import App from "../App";
import DashboardLayout from "../layout/DashboardLayout";
import Users from "../components/dashboard/users/Users";
import DashboardHome from "../components/dashboard/home/DashboardHome";
import Settings from "../components/dashboard/settings/Settings";
import Profile from "../components/dashboard/profile/Profile";
import Notice from "../components/dashboard/notice/Notice";

import UpdateNotice from "../components/dashboard/notice/UpdateNotice";
import AddNotice from "../components/dashboard/notice/AddNotice";



export const router = createBrowserRouter([
    {
        path :"/",
        element : <MainLayout />,
        children : [
            {
                index : true,
                element : <App />
            }
        ],
    },
    {
        path : "/dashboard",
        element : <DashboardLayout />,
        children : [
            {
                index : true,
                element: <DashboardHome />
            },
            {
                path : "users",
                element : <Users />
            },
            {
                path : "notice",
                element : <Notice />
            },
           {
             path: "add-notice",
             element: <AddNotice />
           },
            {
                path : "notice-update/:id",
                element : <UpdateNotice />
            },
            {
                path : "settings",
                element : <Settings />
            },
            {
                path : "profile",
                element : <Profile />
            }
        ]
    },
]);
