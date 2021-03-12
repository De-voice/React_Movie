import React,{ useContext } from 'react';
import { SET_INPUT } from '../../actions';
import { ApplicationContext  } from "../../App";
import Icon from '../Icons/Icon';
import Input from './Input';

function SearchBar() {
	 const [state,dispatch] = useContext(ApplicationContext);
        
	//  func to get access to the user input
    const handleChange = (e) => {
		   const value = e.target.value;
          dispatch({type:SET_INPUT,payload:value})
	}
	
   const { setInput } = state;
    return (
			<form className="relative ">
				<Icon className="fas fa-search sm:fa-lg absolute text-gray-600 top-1 sm:top-3 sm:left-56" />
				<Input
					className="sm:w-64 sm:py-2  text-black sm:px-4 outline-none border rounded-2xl"
					type="text"
					value={setInput}
					onChange={handleChange}
					placeholder="search..."
				/>
			</form>
		);
}

export default SearchBar
