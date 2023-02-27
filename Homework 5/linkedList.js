/*
    HOMEWORK:
        Realize class LinkedList with possibilities to add, remove and find element and function to check is there a loop in Linked list 
         (for checking list for a loop please use Floyd algorithm)
*/

class LinkedList{
    constructor(){
        this.head = null;
    }

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

    remove(value){
        if(this.head){
            let aux = this.head;

            while(aux.next !== null && aux.next.data !== value){
                aux = aux.next;
            }
            if(aux.next.data === value){
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
            if(aux.next.data === value){
                return aux.next;
            }

        } else {
            return null;
        }
    }

    hasLoop(){

    }
}