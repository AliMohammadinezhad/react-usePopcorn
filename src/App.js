import { useState } from "react";
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
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState(null);
	const { movies, isLoading, error } = useMovies(query);
	const [watched, setWatched] = useLocalStorageState([], "watched");

	function handleSelectMovie(id) {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	}

	function handleRemoveMovie() {
		setSelectedId(null);
	}

	function handleAddWatched(movie) {
		setWatched((watched) => [...watched, movie]);
		// localStorage.setItem("watched", JSON.stringify([...watched, movie]))
	}

	function handleDeleteWatched(id) {
		const updatedWatched = watched.filter((m) => m.imdbID !== id);
		setWatched(updatedWatched);
	}

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
