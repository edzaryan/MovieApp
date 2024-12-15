import EntityPage from "../../utils/EntityPage";
import {genreDTO} from "./genre.model";
import {urlGenre} from "../../endpoints";


const GenrePage = () => {
    return (
        <div className="grid gap-10">
            <EntityPage<genreDTO>
                url={urlGenre}
                title="Genres"
                createURL="/genre/create"
                entityName="Genre">
                {
                    (genres, buttons) =>
                        <>
                            <div className="grid grid-cols-[1fr_1fr] border-b-2">
                                <div className="px-4 py-5 text-md font-bold text-gray-700">Name</div>
                                <div className="px-4 py-5 text-md font-bold text-gray-700">Actions</div>
                            </div>
                            {genres?.map(genre =>
                                <div key={genre.id} className="grid grid-cols-[1fr_1fr] border-b hover:bg-gray-50">
                                    <div className="px-4 py-2 text-sm text-gray-600 grid items-center">{genre.name}</div>
                                    <div className="px-4 py-2">
                                        {buttons(`/genre/edit/${genre.id}`, genre.id)}
                                    </div>
                                </div>)
                            }
                        </>
                }
            </EntityPage>
        </div>
    )
}

export default GenrePage;