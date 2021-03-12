import React from 'react'
import MovieList from '../Container/MovieList'

function Movie() {
    // className = "bg-black opacity-95";
    return (
			<div
				style={{ paddingTop: "108px", paddingBottom: "7px" }}
				className="bg-gray-800">
				<MovieList />
			</div>
		);
}

export default Movie
