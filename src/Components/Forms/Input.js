import React from 'react';
import PropTypes from "prop-types"

function Input({type,onChange,placeholder,value,name,checked,className}) {
    return (
			<input
				type={type}
				value={value}
				placeholder={placeholder}
				name={name}
				onChange={onChange}
				checked={checked}
				className={className}
			/>
		);
}

Input.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string.isRequired,
	checked: PropTypes.bool,
	placeholder: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	className:PropTypes.string,
};

export default Input
