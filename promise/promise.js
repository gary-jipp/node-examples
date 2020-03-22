const axios = require('axios');

console.log("User Thread Start");

const promiseFunction = function (value) {
	let promise = new Promise((resolve, reject) => {
		if (value > 0) {
			setTimeout(() => resolve("yay that worked:" + value), value);
		} else {
			setTimeout(() => reject("no value"), 500);
		}
	});

	return promise;
};

const main1 = function () {
	console.log("creating promise");
	const promise = promiseFunction(1200);

	console.log("calling promiseFunction()");
	const status = promise
		.then(result => console.log("complete: " + result))
		.catch(error => console.log("error: " + error))
		.finally(() => console.log("finally: finished"));

	console.log(status);
};

const main2 = function () {
	console.log("calling multiple Promises");
	promise1 = promiseFunction(1330);
	promise2 = promiseFunction(-10);
	promise3 = promiseFunction(200);

	// All resolve or any fail
	const status = Promise.all([promise1, promise2, promise3])
		.then(result => console.log(result))
		.catch(error => console.log("Error: " + error))
		.finally(() => console.log(this.promise1));

	console.log(status);
};

const main3 = function () {
	console.log("calling multiple Promises");
	promise1 = promiseFunction(1330).catch(e => e);
	promise2 = promiseFunction(-10).catch(e => e);
	promise3 = promiseFunction(200).catch(e => e);

	// All resolve or any fail
	const status = Promise.all([promise1, promise2, promise3])
		.then(result => console.log(result))
		.catch(error => console.log("Error: " + error)) // Never happens
		.finally(() => console.log(this.promise1));

	console.log(status);
};


const main4 = function () {
	// create a promise
	const promise = axios.get('https://meowfacts.herokuapp.com/');

	// Execute (start) the promise
	promise.then(res => { console.log(res.data); })
		.catch(error => { console.log(error); });
};

// return from then => becomes "more" thenable
const callAxios = function (url) {

	const promise = axios.get(url)
		.then(function (res) { return res.data; });		// can't trick js into making async sync :-)

	//return promise;  // Maybe I can trick js into waiting to return :) Talk about return from then
	// We will use this a bit later
};

const main5 = function () {
	const status = callAxios('https://meowfacts.herokuapp.com/')
		//.then(data => console.log(data.data[0]))
		;
	console.log(status);
};

const logKanyeResponse = function (res) {
	if (res.data)
		console.log(res.data.quote);
	else if (res.status)
		console.log(res.status);
	else
		console.log(res);

};

const logKanyeResponses = function (responses) {
	console.log(responses.length);
	for (const res of responses) {
		logKanyeResponse(res);
	}
};

/**
 * https://apilist.fun/api/
 * 
 */
const main6 = function () {
	const promise1 = axios.get('https://api.kanye.rest/').catch(e => e);
	const promise2 = axios.get('https://api.kanye.rest/').catch(e => e);
	const promise3 = axios.get('https://api.kanye.rest/').catch(e => e);

	const status = Promise.all([promise1, promise2, promise3])
		.then(responses => { logKanyeResponses(responses); });
	console.log(status);
};


// Chaining promises - in order; nested
const main7 = function () {
	const promise1 = axios.get('https://api.kanye.rest/').catch(e => e);
	const promise2 = axios.get('https://api.kanye.rest//').catch(e => e);
	const promise3 = axios.get('https://api.kanye.rest//').catch(e => e);

	promise1.then(res => {
		logKanyeResponse(res);
		promise2.then(res => {
			logKanyeResponse(res);
			promise3.then(res => {
				logKanyeResponse(res);
			});
		});
	});
};

// Chaining promises, without nesting;
const main8 = function () {
	const promise1 = axios.get('https://api.kanye.rest/').catch(e => e);
	const promise2 = axios.get('https://api.kanye.rest//').catch(e => e);
	const promise3 = axios.get('https://api.kanye.rest//').catch(e => e);

	promise1.then(res => { logKanyeResponse(res); return promise2; })
		.then(res => { logKanyeResponse(res); return promise3; })
		.then(res => res.data.quote)
		.then(quote => console.log(quote));
};


// Chaining promises, without nesting;
const main0 = function () {
	const promise1 = axios.get('https://api.kanye.rest/').catch(e => e);
	const promise2 = axios.get('https://api.kanye.rest//').catch(e => e);
	const promise3 = axios.get('https://api.kanye.rest//').catch(e => e);

	promise1.then(res => { logKanyeResponse(res); return promise2; })
		.then(res => { logKanyeResponse(res); return promise3; })
		.then(res => { return res; })
		.then(res => res)
		.then(res => res)
		.then(res => res)
		.then(res => res)
		.then(res => res)
		.then(res => logKanyeResponse(res));
};


const main10 = async function () {
	// Play with await location
	try {
		let res = axios('https://meowfacts.herokuapp.com/');
		console.log((await res).data.data[0]);
		res = axios('https://meowfacts.herokuapp.com/');
		console.log((await res).data.data[0]);
	}
	catch (e) {
		console.log(e.response);
	}

};


main1();
console.log("User Thread End");
