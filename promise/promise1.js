console.log("User Thread Start");
'use strict';


const myFunction = function (value) {
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
	const promise = myFunction(1200);
	promise
		.then(result => console.log(result))
		.catch(result => console.log(result))
		.finally(() => console.log("Finally!"));
	console.log(promise);
};


const promiseWrapper = function (value) {
	const promise = myFunction(value)
		.catch(result => result);
	return promise;
};

const main2 = function () {
	const promise = myFunction(-1200).catch(result => result);


	promise.then(result => console.log(result));


};


const main3 = function () {
	const promise1 = myFunction(1000).catch(e => e);
	const promise2 = myFunction(-1200).catch(e => e);
	const promise3 = myFunction(600).catch(e => e);

	const status = Promise.all([promise1, promise2, promise3])
		.then(result => console.log(result))
		.catch(result => console.log(result))
		.finally(() => console.log("Finally!"));
};

main3();
console.log("User Thread End");