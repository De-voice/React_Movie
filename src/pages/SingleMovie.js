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
					className="grid grid-cols-7  grid-flow-col  w-full bg-gray-800 text-white">
					<div className=" col-span-5">
						<img
							src={`https://image.tmdb.org/t/p/w500/${state.movieDetails.poster_path}`}
							alt=""
							className="w-full h-full "
						/>
					</div>

					<div className=" col-span-2  flex flex-col mt-10 ">
						<h1 className="text-white text-center ">{state.movieDetails.title}</h1>
						<div className="pt-4">
							<span className="text-white">
								<Icon className="far fa-calendar-alt text-white" />{" "}
								{state.movieDetails.release_date}
							</span>
							<span className="ml-6 text-white">
								<Icon className="far fa-clock text-white" />{" "}
								{state.movieDetails.runtime} min
							</span>
							<span className="ml-6 text-white">
								({state.movieDetails.vote_average})
							</span>
						</div>

						<div className="mt-16 w-6/12 mx-auto">
							<p className="text-justify text-xl text-white">
								{state.movieDetails.overview}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default SingleMovie;
