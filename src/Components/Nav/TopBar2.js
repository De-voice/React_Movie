import React from 'react';
import { Link } from "react-router-dom"

function TopBar2() {
    return (
			<ul className="flex bg-white  mt-3 h-10">
				<li className="sm:text-md text-md self-center  text-black hover:text-gray-600">
					<Link to="/">Home</Link>
				</li>
				<li className="sm:text-md ml-3 text-md self-center  text-black hover:text-gray-600">
					<Link to="/movie">Movies</Link>
				</li>
				<li className="ml-3 text-md sm:text-md self-center text-black hover:text-gray-600">
					<Link to="/series">Tv shows</Link>
				</li>
			</ul>
		);
}

export default TopBar2
