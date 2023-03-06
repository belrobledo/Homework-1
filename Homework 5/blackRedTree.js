/*
    HOMEWORK:
        Develop realisation of black-red tree, it should have the next functions:  
         - Add element to the tree.
         - Remove element from a tree.
         - Find element on a tree.
         - Get max and min depth in a tree.
*/

class Node{
    constructor(element){
        this.data = element;
        this.color = 'R';
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class BlackRedTree{
    constructor(){
        this.root = null;
    }

    add(element){
        const newNode = new Node(element);

        if(!this.root){
            newNode.color = 'B';
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(tree, newNode){
        //true when a red node has a red child
        redRed = false;

        //insert node
        if(tree === null){
            return newNode;
        } else {
            if(newNode.data < tree.data){
                tree.left = this.insertNode(tree.left, newNode);
                tree.left.parent = tree;
                if(tree.color === 'R' && tree.left.color === 'R'){
                    redRed = true;
                }
            } else {
                tree.right = this.insertNode(tree.right, newNode);
                tree.right.parent = tree;
                if(tree.color === 'R' && tree.right.color === 'R'){
                    redRed = true;
                }
            }
        }

        //if there's red conflict
        if(redRed){
            if(tree.parent.left === tree){   //if true, uncle is right child
                if(tree.parent.right === null || tree.parent.right.color === 'B'){  //checks uncle color. If black, rotates. If red, swaps colors.
                    //rotation
                } else {
                    tree.color = 'B';
                    tree.parent.right.color = 'B';
                    if(tree.parent !== this.root){
                        tree.parent.color = 'R';
                    }
                }
            } else if (tree.parent.right === tree){ //uncle is left child
                if(tree.parent.left === null || tree.parent.left.color === 'B'){
                    //rotation
                } else {
                    tree.color = 'B';
                    tree.parent.left.color = 'B';
                    if(tree.parent !== this.root){
                        tree.parent.color = 'R';
                    }
                }
            }
            redRed = false;
        }
        
    }

    rotateLeft(node){
        let x = node.right;
        let y = x.left;
        node.right = y;
        x.left = node;
        node.parent = x;
        if(y !== null){
            y.parent = node;
        }

        return x;
    }

    rotateRight(node){
        let x = node.left;
        let y = x.right;
        node.left = y;
        x.right = node;
        node.parent = x;
        if(y !== null){
            y.parent = node;
        }

        return x;
    }

    remove(element){

    }

    find(tree, element){
        if(tree === null || tree.data === element){
            return tree;
        } else {
            if(element < tree.data){
                return this.find(tree.left, element);
            } else {
                return this.find(tree.right, element);
            }
        }
    }

    maxDepth(){
        if(tree === null){
            return 0;
        } else {
            const Ldepth = 1 + this.maxDepth(tree.left);
            const Rdepth = 1 + this.maxDepth(tree.right);
            if(Ldepth >= Rdepth){
                return Ldepth;
            } else {
                return Rdepth;
            }
        }
    }

    minDepth(tree){
        if(tree === null){
            return 0;
        } else {
            const Ldepth = 1 + this.minDepth(tree.left);
            const Rdepth = 1 + this.minDepth(tree.right);
            if(Ldepth <= Rdepth){
                return Ldepth;
            } else {
                return Rdepth;
            }
        }
    }
}