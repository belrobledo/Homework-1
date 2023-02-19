/*
    Enunciate and justify the order of execution of the following sentences:
*/

const fs = require('fs');

async function main(){
    console.log('START'); //A

    setTimeout(() => console.log('SetTimeout'), 0) //B
    setImmediate(() => console.log('SetImmediate')) //C

    Promise.resolve().then(() => {
        console.log('Promise'); //D
        process.nextTick(() => console.log('Promise next tick')) //E
    });

    fs.readFile('index.js', () => {
        console.log('Read file'); //F
        setTimeout(() => console.log('Read file SetTimeout'), 0) //G
        setImmediate(() => console.log('Read file SetImmediate')) //H
        process.nextTick(() => console.log('Read file next tick')) //I
    })

    const response = await Promise.resolve('Async/await');
    console.log(response); //J

    process.nextTick(() => console.log('Next Tick')); //K
    setTimeout(() => console.log('SetTimeout'), 0); //L

    console.log('END'); //M
}

main();

/*
    We will see the logs in this order:

    A. START
        -> because it is the first sentence and a synchronous task.
    D. Promise
        -> Promise.resolve() returns a resolved promise immediately, so the callback is executed. Inside this callback, sentence D it's synchronous so we see "Promise" printed.
            Then, we have two async macrotasks. setTimeout() is sent to the Timers queue and setImmediate() is sent to the Check queue.
    J. Async/await
        -> In the code, fs.readFile is next but since it's an I/O async task it's sent to the Poll queue. The way node js reactor pattern is designed, Poll queue has the lowest
            priority and it will be left for the end.
            So, we get to the await Promise.resolve() sentence. Same case than the previous Promise, it's inmediately resolved and the response "Async/await" is printed.
    M. END
        -> Next, we see the synchronous console.log("END").
    E. Promise next tick
        -> At this point, all the synchronous tasks have been executed and since the Stack is free, Event Loop starts working with the asynchronous.
            In nodejs reactor pattern, microtasks have the higher priority. But inside this category, we have a division between next-tick queue and other microtasks queue,
            being next-tick operations the most important ones.
            So, Event Loop will run through all the tasks in the next-tick queue, in the order they entered the queue (FIFO). Prints "Promise next tick" first.
    K. Next tick
        -> Second task in the next tick queue. Prints "Next tick".
    B. SetTimeout
        -> When all the microtasks have been cleared, Event Loop can procede with the next phase (macrotasks). The macrotasks queue is splitted in five priorities:
            Timers/Check (depending on the version) > Pending > Close > Poll and also Idle/Prep for internal use.
            Being timers the higher priority microtasks, Event Loop will handle the two setTimeouts (B and L) that were in the qeueue.
    L. SetTimeout
        -> Second and last task in the Timers Queue.
    C. SetImmediate
        -> Between every macrotasks queue, it will execute all the microtasks. But since microtasks queue is empty now, Event Loop will procede with Check Queue
            and execute the sentence C. When all Check queue's tasks have been handled, it will continue operating and finally get to Poll queue.
    F. Read file
        -> When fs.readFile's callback is invoked, the first thing will be printing "Read file", as it is a simple synchronous task. Then, it will send sentence G to Timers
            queue, sentence H to Check queue, and sentence I to Next tick queue.
            After this the first Event Loop cycle is finished and it starts again.
    I. Read file next tick
    H. Read file SetImmediate
    G. Read file SetTimeout
*/