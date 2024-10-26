import { createBrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main";
import Error404 from "./components/pages/Error/Error404/Error404";

export const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <Error404 />,
        // children: [{
        //     path: "/",
        //     element: <Main />
        // },
        // ]
    }
])