import { useState } from "react";
import { tempWatchedData } from "./TempData";
import WatchedMovie from "./WatchedMovie";
import WatchedMovieSummery from "./WatchedMovieSummery";

export default function WatchedMoviesList() {
  const [watched, setWatched] = useState(tempWatchedData);
  return (
    <>
      <WatchedMovieSummery watched={watched} />
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    </>
  );
}
