import "../App.css"
import React from "react";
import HomeList from "../Container/HomeList";
import ToRatedList from "../Container/ToRatedList";



//  videos
// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US

// latest
// https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US

// top_rated
// https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1

// theatres
// https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1

function Home() {
	

	return (
		<>
			<div
				style={{ paddingTop: "125px", paddingBottom: "7px" }}
				className="bg-gray-800">
				<h1 className="text-blue-500 mt-3 font-bold text-lg mx-2">
					Latest Movies
				</h1>
				<div className="horizontal block box-border w-full overflow-x-scroll mt-7">
					<div className="block whitespace-nowrap">
						<HomeList />
					</div>
				</div>

				<h1 className="mt-10 text-blue-500 font-bold text-lg mx-2">
					Top Rated Movies
				</h1>
				<div className="horizontal mt-7">
					<div className="block whitespace-nowrap">
						<ToRatedList />
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
