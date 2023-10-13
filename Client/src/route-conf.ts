import ActorPage from "./pages/Actor/ActorPage";
import CreateGenre from "./pages/Genre/CreateGenrePage";
import EditGenre from "./pages/Genre/EditGenrePage";
import GenrePage from "./pages/Genre/GenrePage";
import HomePage from "./pages/Home/HomePage";
import CreateActorPage from "./pages/Actor/CreateActorPage";
import EditActorPage from "./pages/Actor/EditActorPage";
import CreateMoviePage from "./pages/Movie/CreateMoviePage";
import EditMoviePage from "./pages/Movie/EditMoviePage";
import FilterMoviePage from "./pages/Movie/FilterMoviePage";
import CreateMovieTheatrePage from "./pages/MovieTheater/CreateMovieTheatrePage";
import EditMovieTheatrePage from "./pages/MovieTheater/EditMovieTheatrePage";
import MovieTheatrePage from "./pages/MovieTheater/MovieTheatrePage";
import MovieDetailsPage from "./pages/Movie/MovieDetailsPage";

import RedirectToHomePage from "./utils/RedirectToHomePage";
import Register from "./auth/Register";
import Login from "./auth/Login";
import UsersPage from "./pages/User/UsersPage";

const routes = [
    { path: "/", component: HomePage },

    { path: "/genres", component: GenrePage, isAdmin: true },
    { path: "/genres/create", component: CreateGenre, isAdmin: true },
    { path: "/genres/edit/:id", component: EditGenre, isAdmin: true },

    { path: "/actors", component: ActorPage, isAdmin: true },
    { path: "/actors/create", component: CreateActorPage, isAdmin: true },
    { path: "/actors/edit/:id", component: EditActorPage, isAdmin: true },

    { path: "/movie/create", component: CreateMoviePage, isAdmin: true },
    { path: "/movie/edit/:id", component: EditMoviePage, isAdmin: true },
    { path: "/movie/filter", component: FilterMoviePage },
    { path: "/movie/:id", component: MovieDetailsPage },

    { path: "/movietheatres", component: MovieTheatrePage, isAdmin: true },
    { path: "/movietheatres/create", component: CreateMovieTheatrePage, isAdmin: true },
    { path: "/movietheatres/edit/:id", component: EditMovieTheatrePage, isAdmin: true },

    { path: "/register", component: Register },
    { path: "/login", component: Login },
    { path: "/users", component: UsersPage, isAdmin: true },

    { path: '*', component: RedirectToHomePage }
];

export default routes;