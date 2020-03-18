const axios = require('axios');

console.log("User Thread Start");

const doStuff = function (callback, text) {
	callback(text);
};

const longRunningFunction = function (value) {
	let promise = new Promise(function (resolve, reject) {
		// Do something that takes time.
		if (value > 0) {
			// setTimeout(doStuff(resolve, "yay that worked:"+value), value);
			setTimeout(() => resolve("yay that worked:" + value), value);
		} else {
			setTimeout(doStuff(reject, "oh no!:" + value), 500);
			// setTimeout(() => reject("error, no value"), 500);
		}
	});

	return promise;
};

const main1 = function () {
	console.log("calling longRunningFunction()");

	const status = longRunningFunction(220)
		.then(result => console.log(result))
		.catch(error => console.log(error))
		.finally(() => console.log("finished"));

	console.log(status);
};

const main2 = function () {
	console.log("calling multiple Promises");
	promise1 = longRunningFunction(1330).catch(e => e);
	promise2 = longRunningFunction(-10).catch(e => e);
	promise3 = longRunningFunction(200).catch(e => e);

	const status = Promise.all([promise1, promise2, promise3])
		.then(result => console.log(result))
		.catch(error => console.log("Error: " + error)) // Never happens
		.finally(() => console.log(this.promise1));

	console.log(status);
};

const main3 = function () {

	axios.get('https://uselessfacts.jsph.pl/random.txt?language=en')
		.then(res => {
			console.log(res.data);
		})
		.catch(function (error) {
			console.log(error);
		});

};

const callAxios = function (url) {

	const promise = axios.get(url)
		.then(function (res) { return res.data; });		// can't trick js into making async sync :-)

	// return promise;  // Maybe I can trick js into waiting to return :)
};

const main4 = function () {

	const status = callAxios('https://meowfacts.herokuapp.com/');
	// .then(res => console.log(res));

	console.log(status);

};



const main5 = function () {

	const promise1 = axios.get('https://meowfacts.herokuapp.com/').catch(e => e);
	const promise2 = axios.get('https://meowfacts.herokuapp.com/').catch(e => e);
	const promise3 = axios.get('https://meowfacts.herokuapp.com/').catch(e => e);

	const status = Promise.all([promise1, promise2, promise3])
		.then(responses => {
			console.log(responses.length);
			for (const res of responses) {
				if (res.data)
					console.log(res.data.data[0]);
				else
					console.log(res.response.status);
			}
		}
		)
		.catch(error => console.log(error.response.status));

	console.log(status);
};


const main6 = async function () {

	try {
		const res = axios('https://meowfacts.herokuapp.com/');
		console.log((await res).data.data[0]);
	}
	catch (e) {
		console.log(e.response);
	}

};


main2();
console.log("User Thread End");
