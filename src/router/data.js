import ContactPage from "../pages/contact";
import MainPage from "../pages/main";
import NotFoundPage from "../pages/notFound";
import PartnersPage from "../pages/partners";
import ResidencesPage from "../pages/residences";
import DealsPage from "../pages/deals";
import LogInPage from "../pages/logIn";

export const dataRouter = [
    {
        id : 1,
        path : "/",
        element : <LogInPage/>
    },
    {
        id : 3,
        path : "/contact",
        element : <ContactPage/>
    },
    {
        id : 4,
        path : "/deals",
        element : <DealsPage/>
    },
    {
        id : 5,
        path : "/main",
        element : <MainPage/>,
        
    },
    {
        id : 6,
        path : "/*",
        element : <NotFoundPage/>
    },
    {
        id : 7,
        path : "/partners",
        element : <PartnersPage/>
    },
    {
        id : 8,
        path : "/residences",
        element : <ResidencesPage/>
    },
    {
        id : 9,
        path : "/logIn",
        element : <LogInPage/>,
        path :  window.localStorage.getItem('AuthToken') && "/logIn",
        element : window.localStorage.getItem('AuthToken') && <LogInPage/>
    }
]
