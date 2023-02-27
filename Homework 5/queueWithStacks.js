/*
    HOMEWORK:
        We are given a stack data structure with push and pop operations, the task is to implement a queue using instances of stack data structure and operations on them.
*/

class Stack{    //Last In First Out
    constructor(){
        this.elements = [];
    }

    push(value){
        this.elements.push(value);
    }

    pop(){
        if(!this.isEmpty()){
            return this.elements.pop();
        } else{
            return null;
        }
    }

    top(){
        if(!this.isEmpty()){
            return this.elements[this.elements.length - 1];
        } else {
            return null;
        }
    }

    isEmpty(){
        return (this.elements.length === 0);
    }
}


class Queue{    //First In First Out
    constructor(){
        this.stackIn = new Stack();
        this.stackOut = new Stack();
    }

    //add new elements to stackIn
    enqueue(value){
        this.stackIn.push(value);
    }

    //move all elements from stackIn to stackOut each time dequeue() is called and stackOut is empty, inverting the order. Pop elements from stackOut.
    dequeue(){
        if(this.isEmpty()){
            return null;
        } else{
            if(this.stackOut.isEmpty()){
                while(!this.stackIn.isEmpty()){
                    this.stackOut.push(this.stackIn.pop());
                }
            }

            return this.stackOut.pop();
        }
    }

    isEmpty(){
        return (this.stackIn.isEmpty() && this.stackOut.isEmpty());
    }
}

//Test
let queue = new Queue();
queue.enqueue(3);
queue.enqueue(1);
queue.enqueue(6);
queue.enqueue(8);

console.log(queue.isEmpty());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
queue.enqueue(22);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());