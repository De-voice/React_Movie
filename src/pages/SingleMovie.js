import React, { useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import {
	FETCH_FAILED,
	FETCH_INIT,
	FETCH_SINGLE_MOVIE_DETAILS,
} from "../actions";
import { reqInstance } from "../api/request/req";
import { ApplicationContext } from "../App";
import Icon from "../Components/Icons/Icon";

function SingleMovie() {
	const { id } = useParams();

	const [state, dispatch] = useContext(ApplicationContext);

	const getMovieDetails = useCallback(() => {
		dispatch({ type: FETCH_INIT });
		reqInstance
			.get(
				`/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
			)
			.then((res) => {

				dispatch({ type: FETCH_SINGLE_MOVIE_DETAILS, payload: res.data });
			})
			.catch((err) => {
				dispatch({ type: FETCH_FAILED, payload: err });
			});
	}, [dispatch, id]);

	// console.log(state.movieDetails);
	useEffect(() => {
		getMovieDetails();
	}, [getMovieDetails]);

	// initial state of the movie obj is null set loading to true
	// if(state.movieDetails === null && state.isLoading === true) return <h1>Loading...</h1>

	return (
		<div style={{ paddingTop: "116px" }} className="overflow-y-hidden">
			{state.movieDetails === null ? (
				<h1 className="bg-blue-900">Loading..</h1>
			) : (
				<div
					style={{ height: "86vh" }}
					className="grid grid-cols-7  grid-flow-col  w-full bg-gray-800">
					<div className=" col-span-2">
						<img
							src={`https://image.tmdb.org/t/p/w500/${state.movieDetails.poster_path}`}
							alt=""
							className="w-full h-full "
						/>
					</div>

					<div className=" col-span-5 text-center flex flex-col mt-10 ">
						<h1 className="text-white ">{state.movieDetails.title}</h1>
						<div className="pt-4">
							<span>
								<Icon className="far fa-calendar-alt" />{" "}
								{state.movieDetails.release_date}
							</span>
							<span className="ml-6">
								<Icon className="far fa-clock" /> {state.movieDetails.runtime}{" "}
								min
							</span>
							<span className="ml-6">({state.movieDetails.vote_average})</span>
						</div>

						<div className="mt-16 w-6/12 mx-auto">
							<p className="text-justify text-lg">
								{state.movieDetails.overview}
							</p>
						</div>
						<div className="flex  md:mt-44 justify-evenly items-baseline">
							<button
								className="bg-transparent  border-2 py-3 px-4 border-white
                            ">
								Watch Now
							</button>
							<Icon className="fas fa-heart fa-2x cursor-pointer ml-5" />

							<a
								href={state.movieDetails.homepage}
								className="cursor-pointer"
								rel="noreferrer"
								target="_blank">
								<Icon className=" fab fa-youtube" />
								Trailer
							</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default SingleMovie;
