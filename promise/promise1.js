const axios = require('axios');

console.log("User Thread Start");

// Two parts: anonymous function, assign that to a named variable
const myFunction = function (value) {
	return value;
};

const myFunction1 = (value) => { return value; };

// *** REMEMBER THIS PATTERN  ***
// const myFunction1 = (value => value);
// ******************************

const main = function () {
	console.log("value: " + myFunction(500));
	console.log("value: " + myFunction1(500));
};
//****************************************************** 

main();

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

// Why would we want to create our own promises?
const { Pool } = require("pg");
const pool = new Pool({
	host: "localhost",
	user: "postgres",
	database: "scheduler",
	port: "5432"
});

const callpg = function () {
	pool.query("SELECT * from days", (err, res) => {
		console.log(res.rows);
		pool.end();
	});
};

// Can turn callback functions into promises
const query = function (sql) {
	const promise = new Promise((resolve, reject) => {

		pool.query(sql, (err, res) => {
			err ? reject(err) : resolve(res.rows);
			pool.end();
		});
	});
	return promise;
};

const main11 = function () {

	query("SELECT * from days")
		.then(result => console.log(result))
		.catch(err => console.log(err.code));

};
// main11();



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
	const promise1 = myPromise(1000).catch(e => e);  //write  without catch first
	const promise2 = myPromise(-1200).catch(e => e);
	const promise3 = myPromise(600).catch(e => e);

	const status = Promise.all([promise1, promise2, promise3])
		.then(result => console.log(result))
		.catch(result => console.log(result))		// Never called
		.finally(() => console.log("Finally!"));
};


const main4 = function () {
	const promise = axios.get('https://meowfacts.herokuapp.com/');
	promise.then(res => { console.log(res.data.data.pop()); })
		.catch(error => { console.log(error); });

};


console.log("User Thread End");