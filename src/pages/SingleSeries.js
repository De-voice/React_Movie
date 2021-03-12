import React, { useCallback, useContext, useEffect, } from "react";
import { useParams } from "react-router-dom";
import { ApplicationContext } from "../App";
import { reqInstance } from "../api/request/req";
import {  FETCH_SINGLE_SERIES_DETAILS } from "../actions";
import Icon from "../Components/Icons/Icon";

function SingleSeries() {
	const { id } = useParams();
	const [state, dispatch] = useContext(ApplicationContext);


	useEffect(() => {
		reqInstance
			.get(`/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
			.then((res) => {
				dispatch({ type: FETCH_SINGLE_SERIES_DETAILS, payload: res.data });
			});
	}, [id, dispatch]);



	console.log(state.seriesDetails);

	return (
		<div style={{ paddingTop: "116px" }}>
			{!state.seriesDetails ? (
				<h1 className="bg-blue-900">Loading...</h1>
			) : (
				<div
					style={{ height: "86vh" }}
					className="grid grid-cols-7  grid-flow-row  w-full bg-gray-800">
					<div className="col-span-7 grid grid-cols-7">
						<div className="col-span-1">
							<img
								className="col-span-1"
								src={`https://image.tmdb.org/t/p/w500/${state.seriesDetails.poster_path}`}
								alt={state.seriesDetails.name}
							/>
						</div>

						<div className=" col-span-6">
							<h1>{state.seriesDetails.name}</h1>
							<span>
								<Icon className="far fa-clock" />{" "}
								{state.seriesDetails.episode_run_time} min
							</span>

							<span>
								<Icon className="far fa-calendar-alt" />{" "}
								{state.seriesDetails.first_air_date}
							</span>

							<span>({state.seriesDetails.vote_average})</span>

							<div>
								<p>{state.seriesDetails.overview}</p>
							</div>
						</div>
					</div>

					{/* last div */}
					{/* <div className="bg-green-600 col-span-7 grid grid-cols-7">
						<div className="bg-gray-600 col-span-1">
						
						</div>

						<div className="bg-yellow-600 col-span-2">
						</div>
						<div className="bg-black col-span-4">djhdj</div>
					</div> */}
				</div>
			)}
		</div>
	);
}

export default SingleSeries;
