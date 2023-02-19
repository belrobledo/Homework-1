/*
Create your own realisation of EventEmitter. It should support 4 methods:
    1. emitter.emit(eventName, [...args])  - Synchronously calls each of the listeners registered for the event named eventName, 
        in the order they were registered, passing the supplied arguments to each.
    2. emitter.on(eventName, listener) - Adds the listener function to the end of the listeners array for the event named eventName. 
        No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and
        listener will result in the listener being added, and called, multiple times.
    3. emitter.prependListener(eventName, listener) - Adds the listener function to the beginning of the listeners array for the event 
        named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination 
        of eventName and listener will result in the listener being added, and called, multiple times.
    4. emitter.removeListener(eventName, listener) - Removes the specified listener from the listener array for the event named eventName.
*/

class EventEmitter {
    constructor(){
        this.events = {};
    }

    emit(eventName, ...args){
        if(this.events[eventName]){
            this.events[eventName].forEach(listener => {
                listener(...args);
            });
        }
    }

    on(eventName, listener){
        if(!this.events[eventName]){
            this.events[eventName] = [];
        }

        this.events[eventName].push(listener);
    }

    prependListener(eventName, listener){
        if(!this.events[eventName]){
            this.events[eventName] = [];
        }

        this.events[eventName].unshift(listener);
    }

    removeListener(eventName, listener){
        if(this.events[eventName]){
            const index = this.events[eventName].indexOf(listener);
            (index !== -1) && this.events[eventName].splice(index, 1);
        }

    }
}


function testEmitter(test, strA, strB){

    //Create my listeners and assign them to variables in case I want to remove them later.
    const listenerErr = function(){ console.log('Error Message'); }
    
    const listener1 = function(strA, strB){ console.log(strA + " " + strB); }
    
    const listener2 = function(){ console.log('2nd Listener'); }

    //Create an instance of the class EventEmitter and set up the event listeners.
    const emitter = new EventEmitter();

    emitter.on('error', listenerErr);
    emitter.on('test', listener1);
    emitter.prependListener('test', listener2);

    //Emit the events
    if(test === 'error'){
        emitter.emit('error');
    } else{
        emitter.emit('test', strA, strB);

        //Test removing listener1 and emitting again
        emitter.removeListener('test', listener1);
        emitter.emit('test');
    }

    //Return the emitter to keep the instance created.
    return emitter;

}

testEmitter('test', '1st', 'Listener');