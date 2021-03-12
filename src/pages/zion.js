// Add to local storage
addToLocalStorage = (product) => {
	let cardProducts = localStorage.getItem("cardProducts");
	if (cardProducts) {
		let itemArray = JSON.parse(cardProducts);
		let itemExist = itemArray.filter((item) => item.id === product.id);

		if (itemExist.length > 0) {
			this.snackBarShow("Product exists in cart");
		} else {
			itemArray.push(product);
			let newItemString = JSON.stringify(itemArray);
			localStorage.setItem("cardProducts", newItemString);
			this.snackBarShow("Product added to cart");
		}
	} else {
		let newItem = [product];
		let newItemString = JSON.stringify(newItem);
		localStorage.setItem("cardProducts", newItemString);
		this.snackBarShow("Product added to cart");
	}

	this.updateProductsCount();
	this.getProductsFromLocalStorage();
};

// Get from local storage
getProductsFromLocalStorage = () => {
	let cardProducts = localStorage.getItem("cardProducts");
	if (cardProducts) {
		this.setState({ loading: false });
		let itemArray = JSON.parse(cardProducts);
		// console.log('Array', itemArray);
		if (itemArray.length > 0) {
			this.setState({
				cartProducts: itemArray,
			});
		}
	}
};
