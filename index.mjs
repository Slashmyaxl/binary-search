import { Tree, cleanArray } from './binary-search.mjs'

const newArray = createRandomArray(35)
const cleanedArray = cleanArray(newArray);
const myBinaryTree = Tree(cleanedArray);
myBinaryTree.print();
console.log(myBinaryTree.isBalanced())
console.log(myBinaryTree.levelOrder())
console.log(myBinaryTree.preOrder())
console.log(myBinaryTree.postOrder())
console.log(myBinaryTree.inOrder())
myBinaryTree.insert(155);
myBinaryTree.insert(112);
myBinaryTree.insert(102);
myBinaryTree.insert(198);
myBinaryTree.insert(3365);
myBinaryTree.insert(245);
myBinaryTree.insert(1578);
myBinaryTree.print();
console.log(myBinaryTree.isBalanced())
myBinaryTree.rebalance();
myBinaryTree.print();
console.log(myBinaryTree.isBalanced())
console.log(myBinaryTree.levelOrder())
console.log(myBinaryTree.preOrder())
console.log(myBinaryTree.postOrder())
console.log(myBinaryTree.inOrder())


function createRandomArray (length) {
    const randomArray = [];
    while (randomArray.length < length) {
        randomArray.push(Math.floor(Math.random() * 100))
    }
    return randomArray;
}