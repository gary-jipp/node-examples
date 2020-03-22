console.log("User Thread Start");
"use strict";

// Two parts: anonymous function, assign to named variable
const myFunction = function (value) {
	return value;
};

// *** REMEMBER THIS PATTERN  ***
const myFunction1 =	value => value;
// ******************************

const main = function () {
	console.log("value: " + myFunction(500));
	console.log("value: " + myFunction1(300));
};
//****************************************************** 

const myPromise = function (value) {
	const promise = new Promise((resolve, reject) => {
		if (value > 0) {
			setTimeout(() => { resolve("Yay! That worked: " + value); }, value);
		}
		else {
			setTimeout(() => { reject("Boo! Bad value: " + value); }, value);
		}
	});
	return promise;
};

const main1 = function () {
	const promise = myPromise(1200);

	promise
		.then(result => console.log(result))
		.catch(result => console.log(result))
		.finally(() => console.log("Finally!"));
	console.log(promise);
};


// can we trick Javascript into making our function synchronous ?? :)
const cleverPromiseWrapper = function (value) {
	const promise = myPromise(value)
		.then(result => result);
	// return promise;
};

const main2 = function () {

	// Does it work ?
	const status = cleverPromiseWrapper(3000);
	console.log(status);

	// return from then() or catch() adds a "then" to the chain.
	const promise = myPromise(-1200)
	.catch(error => error)
	.then(result => result)
	.then(result => result);

	promise.then(result => console.log(result));

};


const main3 = function () {
	const promise1 = myPromise(1000).catch(e => e);
	const promise2 = myPromise(-1200).catch(e => e);
	const promise3 = myPromise(600).catch(e => e);

	const status = Promise.all([promise1, promise2, promise3])
		.then(result => console.log(result))
		.catch(result => console.log(result))		// Never called
		.finally(() => console.log("Finally!"));
};

main2();
console.log("User Thread End");