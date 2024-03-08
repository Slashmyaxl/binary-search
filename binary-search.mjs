import { mergeSort } from './merge-sort.mjs'

const cleanedArray = cleanArray([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const binaryTree = Tree(cleanedArray);
binaryTree.print()
console.log(binaryTree.levelOrder(add1))
binaryTree.print();


function makeNode(data) {
  return {
      left: null,
      data: data,
      right: null
  }
}

function Tree(arr) {
  let root = buildTree(arr);

  return { 
    print: () => prettyPrint(root),
    insert: (value) => root = insertValue(value, root),
    delete: (value) => root = deleteItem(value, root),
    find: (value) => findValue(value, root),
    levelOrder: (callback) => levelOrder(root, callback)
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

function insertValue(value, node) {
  if (node == null) return node = makeNode(value);
  if (node.data < value) node.right = insertValue(value, node.right)
  else if (node.data > value) node.left = insertValue(value, node.left)
  else console.log('Already exists')
  return node
}

function deleteItem(value, node) {
  if (node == null) return node;
  if (node.data < value) {
    node.right = deleteItem(value, node.right);
    return node
  }
  else if (node.data > value) {
    node.left = deleteItem(value, node.left);
    return node
  }

  // When reaching the node to be deleted, i.e. node's data and value are equal
  
  if (node.left == null) {
    let child = node.right;
    node = null;
    return child
  }
  else if (node.right == null) {
    let child = node.left;
    node = null;
    return child
  }

  // When the node to be deleted has both children

  else {
    let parent = node;
    let succ = node.right;
    while (succ.left !== null) {
      parent = succ;
      succ = succ.left
    }
    if (parent !== node) parent.left = succ.right;
    else parent.right = succ.right;
    node.data = succ.data
    succ = null;

    return node
  }
}

function findValue(value, node) {
  if(value == node.data) return node;
  if(value > node.data) return findValue(value, node.right);
  if(value < node.data) return findValue(value, node.left);
}

function levelOrder(node, callback) {
  if (node == null) return node;
  const queue = [];
  const newList = [];
  queue.push(node);
  while (queue[0]) {
    let current = queue[0];
    callback ? current.data = callback(current.data) : newList.push(current.data);
    if (current.left !== null) {
      queue.push(current.left)
    }
    if (current.right !== null) {
      queue.push(current.right)
    }
    queue.shift();
  }
  return callback ? `${callback} performed on all values.` : newList
}

function add1 (num) {
  return num + 1;
}