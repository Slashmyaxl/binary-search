import { mergeSort } from './merge-sort.js'

const cleanedArray = cleanArray([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(cleanedArray)

const binaryTree = Tree(cleanedArray);

console.log(binaryTree)
binaryTree.prettyPrint()

function makeNode(data) {
    return {
        left: null,
        data: data,
        right: null
    }
}

function Tree(arr) {
    const root = buildTree(arr)
    return { 
        root, 
        prettyPrint: () => prettyPrint(root)
    }
}

function prettyPrint (node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

function cleanArray (arr) {
    const sortedArray = mergeSort(arr);
    const cleanedArray = [];
    sortedArray.forEach(item => {
        if(!cleanedArray.includes(item)) cleanedArray.push(item);
    })

    return cleanedArray
}

function buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null
    const mid = Math.floor(end / 2);
    const rootNode = makeNode(arr[mid]);
    rootNode.left = buildTree(arr.slice(0, mid))
    rootNode.right = buildTree(arr.slice(mid + 1))
    
    return rootNode
}

