import EntityPage from "../../utils/EntityPage";
import {genreDTO} from "./Genres.model";


export default function GenrePage() {

    return (
        <div className="container">
            <EntityPage<genreDTO> url="/api/genres" createURL="/genres/create" title="Genres" entityName="Genre">
                {(genres, buttons) =>
                    <>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {genres?.map(genre =>
                            <tr key={genre.id}>
                                <td>
                                    {buttons(`genres/edit/${genre.id}`, genre.id)}
                                </td>
                                <td>
                                    {genre.name}
                                </td>
                            </tr>)}
                        </tbody>
                    </>}
            </EntityPage>
        </div>
    )
}