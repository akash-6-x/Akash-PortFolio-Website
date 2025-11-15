import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import MainContainer from "../Pages/MainContainer";
import HomeMain from "../Pages/Home/HomeMain";
import Default from "../Pages/Default";
import ProjectsPage from "../Pages/Home/ProjectsPage";
import LogInMainPage from "../Pages/Admin/Auth/LogInMainPage";
import AdminMainPage from "../Pages/Admin/AdminMainPage";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import AdminInitialContent from "../Pages/Admin/adminMainContent/AdminInitialContent";
import AddContentPage from "../Pages/Admin/adminMainContent/AddContentPage";
import UpdateContentPage from "../Pages/Admin/adminMainContent/UpdateContentPage";
import ProjectsList from "../Pages/Admin/adminMainContent/ProjectsList";
import ContentChangePage from "../Pages/Admin/adminMainContent/ContentChangePage";

let MyRoutes = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<MainContainer/>,
                children:[
                    {
                        path:'/',
                        element:<HomeMain/>
                    },
                    {
                        path:'projects',
                        element:<ProjectsPage/>
                    }
                ]
            }
        ]
    },
    {
        path:'admin',
        element:<PublicRoutes>
                    <LogInMainPage/>
                </PublicRoutes>
    },
    {
        path:'administrator',
        element:<PrivateRoutes>
                    <AdminMainPage/>
                </PrivateRoutes>,
        children:[
            {
                index:true,
                element:<AdminInitialContent/>
            },
            {
                path:'add-content',
                element:<AddContentPage/>
            },
            {
                path:'projects-list',
                element:<ProjectsList/>
            },
            {
                path:'update-content',
                element:<UpdateContentPage/>
            },
            {
                path:'content-change-confirmation',
                element:<ContentChangePage/>
            }
        ]
    },
    {
        path:'*',
        element:<Default/>
    }

])

export default MyRoutes;