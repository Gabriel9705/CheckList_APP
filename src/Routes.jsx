import { createBrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main";
import Error404 from "./components/pages/Error/Error404/Error404";
import Home from "./components/pages/home/Home";
import FormAddTeste from "./components/Forms/FormAddTeste/FormAddTeste";

export const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <Error404 />,
        children: [{
            path: "/",
            element: <Home />
        },
        {
            path: "/add_testes",
            element: <FormAddTeste />
        },
        ]
    }
])