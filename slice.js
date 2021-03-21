
const array=[1,2,3,4,5,6,7,8];

// last item
console.log(array.slice(-1)[0]);
console.log(array.slice(-1).pop());
console.log(array[array.length - 1]);

// last item removed
console.log(array.slice(0, array.length - 1));