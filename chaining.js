// Optional chaining

const obj = {
name: "alice",
email: "alice@obj.com"
}

console.log(obj.name.length);

// only works in node 14+
// set NODE_SKIP_PLATFORM_CHECK=1
console.log(obj.address?.length);