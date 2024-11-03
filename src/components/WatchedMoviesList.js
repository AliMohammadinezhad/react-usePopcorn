import WatchedMovie from "./WatchedMovie";
import WatchedMovieSummery from "./WatchedMovieSummery";

export default function WatchedMoviesList({watched}) {
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
