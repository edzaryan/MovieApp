import GenrePage from "./pages/genre/GenrePage";
import HomePage from "./pages/home/HomePage";
import GenreCreatePage from "./pages/genre/GenreCreatePage";
import GenreEditPage from "./pages/genre/GenreEditPage";
import ActorPage from "./pages/actor/ActorPage";
import ActorCreatePage from "./pages/actor/ActorCreatePage";
import ActorEditPage from "./pages/actor/ActorEditPage";
import MovieFilterPage from "./pages/movie/MovieFilterPage";
import MovieCreatePage from "./pages/movie/MovieCreatePage";
import MovieEditPage from "./pages/movie/MovieEditPage";
import MovieTheaterPage from "./pages/movieTheater/MovieTheaterPage";
import MovieTheaterCreatePage from "./pages/movieTheater/MovieTheaterCreatePage";
import MovieTheaterEditPage from "./pages/movieTheater/MovieTheaterEditPage";
import MovieDetailsPage from "./pages/movie/MovieDetailsPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import RedirectToHomePage from "./utils/RedirectToHomePage";
import LoginPage from "./pages/authentication/LoginPage";
import UserPage from "./pages/user/UserPage";


const routes = [
    { path: "/", component: HomePage },

    { path: "/genres", component: GenrePage, isAdmin: true },
    { path: "/genre/create", component: GenreCreatePage, isAdmin: true },
    { path: "/genre/edit/:id", component: GenreEditPage, isAdmin: true },

    { path: "/actors", component: ActorPage, isAdmin: true },
    { path: "/actor/create", component: ActorCreatePage, isAdmin: true },
    { path: "/actor/edit/:id", component: ActorEditPage, isAdmin: true },

    { path: "/movies/filter", component: MovieFilterPage },
    { path: "/movie/create", component: MovieCreatePage, isAdmin: true },
    { path: "/movie/edit/:id", component: MovieEditPage, isAdmin: true },
    { path: "/movie/:id", component: MovieDetailsPage },

    { path: "/movieTheaters", component: MovieTheaterPage, isAdmin: true },
    { path: "/movieTheater/create", component: MovieTheaterCreatePage, isAdmin: true },
    { path: "/movieTheater/edit/:id", component: MovieTheaterEditPage, isAdmin: true },

    { path: "/users", component: UserPage, isAdmin: true },

    { path: "/register", component: RegisterPage },
    { path: "/login", component: LoginPage },

    { path: '*', component: RedirectToHomePage }
];

export default routes;