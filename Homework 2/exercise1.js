/*
Homework 1)
    Write a function that adds a number passed to it to an internal sum and returns itself with its internal sum set to the new value, 
    so it can be chained in a functional manner. 
    Example of usage:
        sum(1) //1
        sum(1)(2) //2
        sum(1)(2)(3)(4)(5)(6)(7) //28
*/

function sum(x) {
    let currentSum = x;

    function add(y) {
        currentSum += y;
        return add;
    }

    add.valueOf = function() {
        return currentSum;
    }

    add.toString = function() {
        return currentSum;
    }

    return add;
}

console.log("sum = " + sum(1)(2)(3));
console.log(3 + sum(1)(2)(3))

 