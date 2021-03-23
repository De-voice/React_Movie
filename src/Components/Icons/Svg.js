import React from 'react';
import PropTypes from "prop-types";


function Svg({
	fill,
	viewBox,
	stroke,
	xmlns,
	strokeLinecap,
	strokeLinejoin,
	strokeWidth,
	d,
	className,
}) {
	return (
		<svg
			className={className}
			fill={fill}
			stroke={stroke}
			viewBox={viewBox}
			xmlns={xmlns}>
			<path
				strokeLinecap={strokeLinecap}
				strokeLinejoin={strokeLinejoin}
				strokeWidth={strokeWidth}
				d={d}></path>
		</svg>
	);
}

Svg.propTypes = {
	fill: PropTypes.string.isRequired,
	stroke: PropTypes.string.isRequired,
	viewBox: PropTypes.string.isRequired,
	xmlns: PropTypes.string.isRequired,
	strokeLinecap: PropTypes.string.isRequired,
	strokeLinejoin: PropTypes.string.isRequired,
	strokeWidth: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	d: PropTypes.string.isRequired,
};

export default Svg
