import React from "react";
import PropTypes from "prop-types"


function Card({ title, src, alt, year, rating, children, lastElementRef }) {
	return (
		<>
			<div className="relative movie" ref={lastElementRef}>
				<img
					src={src}
					alt={alt}
					className="w-full  sm:w-36 sm:h-56 mt-3 "
					style={{ objectFit: "cover" }}
				/>
				<div className="back  w-full sm:w-36 sm:h-56 sm:m-0   hidden   bg-white top-0 absolute">
					<div className="flex flex-col items-center mt-10">
						<h1 className="text-black">{title}</h1>

						<div className="mt-4">
							{children}
							<span className="text-black ml-2">{year}</span>
						</div>
						<span className="text-black">{rating}</span>
					</div>
				</div>
			</div>
		</>
	);
}

Card.propTypes = {
	title: PropTypes.string.isRequired,
	year: PropTypes.string.isRequired,
	rating: PropTypes.number.isRequired,
	src:PropTypes.string.isRequired,
	alt:PropTypes.string.isRequired,
};

export default Card;
