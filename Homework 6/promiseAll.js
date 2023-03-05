/*
Homework: 
    Realize your own promiseAll function which will work the same way as Promise.all from JS. You can't use Promise.all in your function.
*/

function promiseAll(promises = []){
    let results = [];

    return (new Promise((resolve, reject) => {
        if(promises.length > 0){
            promises.forEach(promise => {
                promise.then((result) => {
                    results.push(result);
                    (results.length === promises.length) && resolve(results);
                }).catch( error => {
                    reject(error);
                })
            });
        } else {
            resolve();
        }
    }))
}

const promise1 = new Promise((resolve, reject) => {
    (true) ? resolve("promise1 resolved") : reject("promise1 rejected");
});

const promise2 = new Promise((resolve, reject) => {
    (true) ? resolve("promise2 resolved") : reject("promise2 rejected");
});

const promise3 = new Promise((resolve, reject) => {
    (true) ? resolve("promise3 resolved") : reject("promise3 rejected");
});

const promise4 = new Promise((resolve, reject) => {
    (true) ? resolve("promise4 resolved") : reject("promise4 rejected");
});

const promises = [promise1, promise2, promise3, promise4];


//Fulfills when all promises fulfill, returning the fulfillment values. If a promise rejects, returns the reason of the first promise rejected.
promiseAll(promises).then( results => {
    console.log(results);
}).catch( error => {
    console.log(error);
})

//if no parameter/empty iterable, the promise fulfills anyway.
promiseAll().then( results => {
    console.log(results);
}).catch( error => {
    console.log(error);
})