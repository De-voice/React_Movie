import React from "react";
import { useRouteMatch, Link } from "react-router-dom"
import PropTypes from "prop-types";

function Card({ src, title, lastElementRef, lastRef, vote_average, id }) {

	const match = useRouteMatch();
	return (
		<div ref={lastRef && lastElementRef} className="shadow-2xl">
			<Link to={`${match.url}/${id}`}>
				<img src={src} alt={title} className="w-44" />
			</Link>

			<h1>{vote_average}</h1>
			<Link to={`${match.url}/${id}`}>{title}</Link>
			<h4 className="text-white">WatchList</h4>
		</div>
	);
}

Card.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	vote_average: PropTypes.number.isRequired,
	id:PropTypes.any.isRequired,
};
export default Card;
