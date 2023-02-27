/*
    HOMEWORK:
        Realize class LinkedList with possibilities to add, remove and find element and function to check is there a loop in Linked list 
         (for checking list for a loop please use Floyd algorithm)
*/

class LinkedList{
    constructor(){
        this.head = null;
    }

    //add to the end
    add(value){
        let node = {data: value, next: null};

        if(!this.head){
            this.head = node;
        } else {
            let aux = this.head;

            while(aux.next !== null){
                aux = aux.next;
            }
            aux.next = node;
        }
    }

    //remove first match of given value
    remove(value){
        if(this.head){
            let aux = this.head;

            while(aux.next !== null && aux.next.data !== value){
                aux = aux.next;
            }
            if(aux.next !== null){
                aux.next = aux.next.next;
            }
        }
    }

    find(value){
        if(this.head){
            let aux = this.head;

            while(aux.next !== null && aux.next.data !== value){
                aux = aux.next;
            }
            if(aux.next !== null){
                return aux.next;
            }
        }

        return null;
    }

    //Floyd algorithm with 2 pointers: slow and fast. If fast === null -> false / if fast === slow -> true
    hasLoop(){
        if(this.head){
            let slow = this.head;
            let fast = this.head;

            while(fast && fast.next){
                slow = slow.next;
                fast = fast.next.next;
                
                if(fast === slow){
                    return true;
                }
            }
        }

        return false;
    }
}

//test
const list = new LinkedList();

list.add(1);
list.add(5);
list.add(6);
list.add(7);

console.log(list.hasLoop());

let aux = list.head;
while(aux != null){
    console.log(aux.data);
    aux = aux.next;
}

console.log(list.find(3));
console.log(list.find(5));

list.remove(7);

aux = list.head;
while(aux != null){
    console.log(aux.data);
    aux = aux.next;
}

list.add(7);

const node7 = list.find(7);
node7.next = list.head.next;

console.log(list.hasLoop());