import React, { useEffect, useState } from 'react';
import MovieList from '../../components/Movie/MovieList';
import AlertContext from "../../utils/AlertContext";
import { homePageDTO } from '../../components/Movie/Movies.model';
import axios, {AxiosResponse} from "axios";

const App: React.FC = () => {

  const [movies, setMovies] = useState<homePageDTO>({});

  useEffect(() => {
      loadData();
  }, []);

  function loadData() {
      axios.get("/api/movies").then((response: AxiosResponse<homePageDTO>) => {
          setMovies(response.data);
      });
  }


  return (
    <div className="container">
        <AlertContext.Provider value={() => loadData()}>
            <h3>In Theaters</h3>
            <MovieList movies={movies.inTheatres} />

            <h3>Upcoming Releases</h3>
            <MovieList movies={movies.upcomingReleases} />
        </AlertContext.Provider>
    </div>
  );
}

export default App;