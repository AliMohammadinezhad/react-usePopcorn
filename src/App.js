import { useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import Box from "./components/Box";
import Main from "./components/Main";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Navbar from "./components/Navbar";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";

export const KEY = "c66c4b99";

export default function App() {
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState(null);

	function handleSelectMovie(id) {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	}

	function handleRemoveMovie() {
		setSelectedId(null);
	}

	function handleAddWatched(movie) {
		setWatched((watched) => [...watched, movie]);
	}

	function handleDeleteWatched(id) {
		const updatedWatched = watched.filter((m) => m.imdbID !== id);
		setWatched(updatedWatched);
	}

	useEffect(() => {
		const controller = new AbortController();

		async function fetchMovies() {
			try {
				setIsLoading(true);
				setError("");
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
					{ signal: controller.signal },
				);
				if (!res.ok)
					throw new Error("Something went wrong with fetching movies");
				const data = await res.json();
				if (data.Response === "False") throw new Error("Movie not found");
				setMovies(data.Search);
				setError("");
			} catch (error) {
				if (error.name !== "AbortError") {
					setError(error.message);
					console.log(error.message);
				}
			} finally {
				setIsLoading(false);
			}
		}
		if (query.length < 3) {
			setMovies([]);
			setError("");
			return;
		}
		handleRemoveMovie()
		fetchMovies();
		return function () {
			controller.abort();
		};
	}, [query]);

	return (
		<>
			<Navbar>
				<Search
					query={query}
					setQuery={setQuery}
				/>
				<NumResults movies={movies} />
			</Navbar>
			<Main>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MoviesList
							movies={movies}
							handleSelectMovie={handleSelectMovie}
						/>
					)}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							closeMovie={handleRemoveMovie}
							onAddWatched={handleAddWatched}
							watched={watched}
						/>
					) : (
						<WatchedMoviesList
							watched={watched}
							onDeleteWatched={handleDeleteWatched}
						/>
					)}
				</Box>
			</Main>
		</>
	);
}
