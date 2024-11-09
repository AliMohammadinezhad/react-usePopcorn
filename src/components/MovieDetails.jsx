import React, { useEffect, useState } from "react";
import { KEY } from "../App";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function MovieDetails({
	selectedId,
	closeMovie,
	onAddWatched,
	watched,
}) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [userRating, setUserRating] = useState("");

	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId,
	)?.userRating;
	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	useEffect(() => {
		async function getMovieDetail() {
			try {
				setIsLoading(true);
				setError("");
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
				);
				if (!res.ok)
					throw new Error("Something went wrong with fetching movie.");
				const data = await res.json();
				setMovie(data);
			} catch (error) {
				console.error(error.message);
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}

		getMovieDetail();
	}, [selectedId]);

	useEffect(() => {
		function callback(e) {
			if (e.code === "Escape") {
				closeMovie();
			}
		}
		document.addEventListener("keydown", callback);
		return function () {
			document.removeEventListener("keydown", callback);
		};
	}, [closeMovie]);

	useEffect(() => {
		if (!title) return;
		document.title = `Movie | ${title}`;

		return function () {
			document.title = "usePopcorn";
		};
	}, [title]);

	function handleAddWatchedMovie() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: runtime.split(" ").at(0),
			userRating,
		};

		onAddWatched(newWatchedMovie);
		closeMovie();
	}

	return (
		<>
			{isLoading && <Loader />}
			{!isLoading && !error && (
				<div className='details'>
					<header>
						<button
							className='btn-back'
							onClick={closeMovie}
						>
							&larr;
						</button>
						<img
							src={poster}
							alt={`Poster of the ${movie} movie`}
						/>
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span>
								{imdbRating} IMDb rating
							</p>
						</div>
					</header>

					<section>
						{!isWatched ? (
							<div className='rating'>
								<StarRating
									maxRating={10}
									size={24}
									onSetRating={setUserRating}
								/>
								{userRating > 0 && (
									<button
										className='btn-add'
										onClick={handleAddWatchedMovie}
									>
										+Add to list
									</button>
								)}
							</div>
						) : (
							<div className='rating'>
								you give {watchedUserRating} stars to this movie and that's in
								your watched list!
							</div>
						)}
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</div>
			)}
			{error && <ErrorMessage message={error} />}
		</>
	);
}
