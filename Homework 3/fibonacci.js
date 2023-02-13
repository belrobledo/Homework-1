/*
Make a function to calc n-th fibonacci number with caching
    the n-th Fibonacci number is the sum of the (n-1)th and the (n-2)th. 
    So to calculate the 100th Fibonacci number, for instance, we need to compute all the 99 values before it first.
Please do caching in 2 ways, one with Map and one with WeakMap
Later we can see difference in memory
*/


//MAP
const map = new Map();

function fibMap(n){
    //If exists, return the stored result.
    if(map.has(n)){
        return map.get(n);
    }
    
    let result;
    // if n is less than 2, the result is n. If not, the result is the sum of the (n-1)th and (n-2)th numbers in the sequence
    result = (n < 2) ? n : (fibMap(n-1) + fibMap(n-2));

    //Store the result in the map to avoid recalculating it.
    map.set(n, result);

    return result;
}

//WEAKMAP
const weakMap = new WeakMap();

function fibWeakMap(n){
    //create an array of objects to keep a strong reference to the weakMap keys and prevent the garbage collector from removing them.
    const keys = [];

    function fib(n){
        // If a key for the nth number in the sequence has not been created yet, create an object to be used as key.
        if(!keys[n]){
            keys[n] = {n};
        } else{ //else, return the stored result
            return weakMap.get(keys[n]);
        }

        let result;
        result = (n < 2) ? n : (fib(n-1) + fib(n-2));

        weakMap.set(keys[n], result);
        
        return result;
    }

    return fib(n);
    //when this function ends, keys array will be deleted so the Weak Map data will be removed too.
}

console.log(fibMap(100));
console.log(fibWeakMap(100));
