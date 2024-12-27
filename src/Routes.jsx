import { createBrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main";
import Error404 from "./components/pages/Error/Error404/Error404";
import Home from "./components/pages/home/Home";
import Authentication from "./components/pages/Authentication/Authentication";
import ListaDeSessoes from "./components/ListaDeSessoes/ListaDeSessoes";

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
            path: "/sessao_testes",
            element: <ListaDeSessoes />
        },
        ]
    }, {
        path: "/auth/:action",
        element: <Authentication />
    }
])