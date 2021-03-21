// Demonstrates use of Spread operator to replace an item in an object
const util = require("util");

const obj1 = {
	text: "text for object 1",
	color: "green",
	position: "top"
};

// Create new object with new text
const obj2 = { ...obj1, text: "New text" };
console.log("obj2 = " + util.inspect(obj2));

// Shorthand object creation
const item1 = "item1";
const item2 = "item2";
const obj3 = { item1, item2 };
console.log("obj3 = " + util.inspect(obj3));
