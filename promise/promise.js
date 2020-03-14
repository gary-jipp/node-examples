console.log("Program Start");

const doStuff = function(callback, text) {
	callback(text);
};

const longRunningFunction = function(value) {
	let promise = new Promise(function(resolve, reject) {
		// Do something that takes time.
		if (value > 0) {
			console.log("start timeout: ", value);
			// setTimeout(doStuff(resolve, "yay that worked:"+value), value);
			setTimeout(() => resolve("yay that worked:" + value), value);
		} else {
			setTimeout(doStuff(reject, "oh no! no value"), 500);
			// setTimeout(() => reject("error, no value"), 500);
		}
	});

	return promise;
};

console.log("calling longRunningFunction()");

const status = longRunningFunction(220)
	.then(result => console.log(result))
	.catch(error => console.log(error));

console.log(status);

promise1 = longRunningFunction(3330).catch(e => e);
promise2 = longRunningFunction(0).catch(e => e);
promise3 = longRunningFunction(2200).catch(e => e);

console.log("calling multiple promises");
Promise.all([promise1, promise2, promise3])
	.then(result => console.log(result))
	.catch(error => console.log(error));

// Program flow drops down to here on main thread

console.log("End of user thread");
