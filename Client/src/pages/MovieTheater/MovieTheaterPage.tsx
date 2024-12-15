import EntityPage from "../../utils/EntityPage";
import {movieTheaterDTO} from "./movieTheater.model";
import {urlMovieTheater} from "../../endpoints";


const MovieTheaterPage = () => {
    return (
        <div className="grid gap-10">
            <EntityPage<movieTheaterDTO>
                url={urlMovieTheater}
                title="Movie Theaters"
                createURL="/movietheater/create"
                entityName="Movie Theaters"
            >
                {(movieTheaters, buttons) => <>
                    <>
                        <div className="grid grid-cols-[1fr_1fr] border-b-2">
                            <div className="px-4 py-5 text-md font-bold text-gray-700">Name</div>
                            <div className="px-4 py-5 text-md font-bold text-gray-700">Actions</div>
                        </div>
                        {movieTheaters?.map(movieTheater =>
                            <div key={movieTheater.id} className="grid grid-cols-[1fr_1fr] border-b hover:bg-gray-50">
                                <div className="px-4 py-2 text-sm text-gray-600 grid items-center">{movieTheater.name}</div>
                                <div className="px-4 py-2">
                                    {buttons(`/movieTheater/edit/${movieTheater.id}`, movieTheater.id)}
                                </div>
                            </div>
                        )}
                    </>
                </>}
            </EntityPage>
        </div>
    )
}

export default MovieTheaterPage;