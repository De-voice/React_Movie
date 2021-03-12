import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"
import SearchBar from "../Forms/SearchBar";
import Icon from "../Icons/Icon";

function TopBar1() {

	return (
		<div className="grid grid-cols-3 sm:h-16 h-14 justify-items-center items-center">
			<div className="sm:w-36 w-20 mr-2">
				<img className="w-full" src={logo} alt="" />
			</div>
			<div className="">
				<SearchBar />
			</div>
			<Link to="/favourite">
				<Icon className="fas fa-heart " />
			</Link>
		</div>
	);
}

export default TopBar1;
