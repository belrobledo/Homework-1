/*
Homework 2)
    Write a realisation of a debounce function, here is the specification:
        debounce(func, [wait=0])
    Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked. 
    The func is invoked with the last arguments provided to the debounced function. 
    Subsequent calls to the debounced function return the result of the last func invocation.
*/

function debounce(fn, wait = 0){
    let timer;

    function manageTimer(){
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
        }, wait);
    }

    return manageTimer;
}

const fn = () => {console.log("Timeout. Function executed.")};

const tryDebounce = debounce(fn, 3000);

const button = document.getElementById("btnTry").addEventListener("click", tryDebounce);