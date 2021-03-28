import React from 'react'
import MovieList from '../Container/MovieList'

function Movie() {
    // className = "bg-black opacity-95";
    return (
			<div
				style={{ paddingTop: "120px", paddingBottom: "7px" }}
				className=" overflow-x-hidden">
				<MovieList />
			</div>
		);
}

export default Movie
