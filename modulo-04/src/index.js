const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function promotionLook(groupByCategory){

	let promotion = '';	
	let countKeys = Object.keys(groupByCategory).length;

	if(countKeys < promotions.length)
		promotion = promotions[countKeys - 1];
	else
		promotion = promotions[3];

	const hasFullLook = Object.values(groupByCategory).filter(el => el >= 4).length;
	
	if(hasFullLook && countKeys !== 1)
		promotion = 'FULL LOOK';

	return promotion;
}

function groupByCategory(products){
	return products.reduce(function(acumulator, product){
		let key = product['category'];
		if(!acumulator[key]){
			acumulator[key] = 0;	
		}
		acumulator[key] += 1;
		return acumulator;
	}, {});
}

function calculate(look, productList){

	let totalPrice = 0;
	let discountValue = 0;
	
	productList.forEach(function(el){
		totalPrice += el.regularPrice;		
		const promotionPrice = el.promotions.reduce(function(price, lookItem){			
			if(lookItem.looks.includes(look))			 
				return price + lookItem.price;
			else
				return price;
		}, 0);		
		if(promotionPrice > 0)
			discountValue += el.regularPrice - promotionPrice;
	});

	const discountPercentage = (discountValue * 100) / totalPrice;
	totalPrice -= discountValue;

	return {
		totalPrice,
		discountValue,
		discountPercentage
	};
}

function getShoppingCart(ids, productsList) {

	const productsFilter 		= productsList.filter(el => ids.includes(el.id));
	const productsMap	 		= productsFilter.map((el) => ({ name: el.name, category:  el.category }));
	const productsByCategory	= groupByCategory(productsMap);
	const promotion				= promotionLook(productsByCategory);
	const values				= calculate(promotion, productsFilter);
	const result 				= {
		products: productsMap,
		promotion,
		totalPrice: values.totalPrice.toFixed(2),
		discountValue: values.discountValue.toFixed(2),
		discount: values.discountPercentage.toFixed(2) + '%'
	};
	
	//console.log(result);
	return result;
}

module.exports = { getShoppingCart };
