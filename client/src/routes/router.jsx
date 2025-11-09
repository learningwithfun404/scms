import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import App from "../App";



export const router = createBrowserRouter([
    {
        path :"/",
        element : <MainLayout />,
        children : [
            {
                index : true,
                element : <App />
            }
        ]
    },
])
