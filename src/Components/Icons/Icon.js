import React from 'react';
import PropTypes from "prop-types"

function Icon({className,onClick}) {
    return <i className={className} onClick={onClick}></i>;
}

Icon.propTypes = {
	className: PropTypes.string.isRequired,
	onClick:PropTypes.func,

};
export default Icon
