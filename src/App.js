import { useState } from "react";
import { tempMovieData } from "./components/TempData";
import MoviesList from "./components/MoviesList";
import MoviesBox from "./components/MoviesBox";
import WatchedMoviesBox from "./components/WatchedMoviesBox";
import Main from "./components/Main";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Navbar from "./components/Navbar";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  return (
    <>
      <Navbar>
        <Search />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <MoviesBox>
          <MoviesList movies={movies} />
        </MoviesBox>
        <WatchedMoviesBox />
      </Main>
    </>
  );
}
