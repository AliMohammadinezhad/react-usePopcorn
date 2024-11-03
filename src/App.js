import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./components/TempData";
import MoviesList from "./components/MoviesList";
import Box from "./components/Box";
import Main from "./components/Main";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Navbar from "./components/Navbar";
import WatchedMoviesList from "./components/WatchedMoviesList";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Navbar>
        <Search />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          <MoviesList movies={movies} />
        </Box>
        <Box>
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
