import { mergeSort } from './merge-sort.mjs'

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
    levelOrder: (callback) => levelOrder(root, callback),
    preOrder: (callback) => preOrder(root, callback),
    inOrder: (callback) => inOrder(root, callback),
    postOrder: (callback) => postOrder(root, callback),
    height: (value = root.data) => height(findValue(value, root)),
    depth: (value = root.data) => depth(findValue(value, root), root),
    isBalanced: () => isBalanced(root),
    rebalance: () => root = buildTree(rebalance(root))
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
  if(!node) return null
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
    if (current.left !== null) queue.push(current.left)
    if (current.right !== null) queue.push(current.right)
    queue.shift();
  }
  return callback ? `${callback} performed on all values.` : newList
}

function preOrder(node, callback, newList = []) {
  if (node == null) return node;
  callback ? node.data = callback(node.data) : newList.push(node.data);
  preOrder(node.left, callback, newList)
  preOrder(node.right, callback, newList)
  
  return callback ? `${callback} performed on all values.` : newList
}

function inOrder(node, callback, newList = []) {
  if (node == null) return node
  inOrder(node.left, callback, newList)
  callback ? node.data = callback(node.data) : newList.push(node.data)
  inOrder(node.right, callback, newList)
 
  return callback ? `${callback} performed on all values.` : newList
}

function postOrder(node, callback, newList = []) {
  if (node == null) return node
  postOrder(node.left, callback, newList)
  
  postOrder(node.right, callback, newList)
  callback ? node.data = callback(node.data) : newList.push(node.data)
 
  return callback ? `${callback} performed on all values.` : newList
}

function height(node) {
  if (node == null) return 0
  return 1 + Math.max(
    node.left !== null ? height(node.left) : 0,
    node.right !== null ? height(node.right) : 0
  );
}

function depth(node, root) {
  if (node == null) return 0
  return height(root) - height(node)
}

function isBalanced(node) {
  if (Math.abs(height(node.left) - height(node.right)) > 1) return false
  return true
}

function rebalance(node) {
  let newArray = levelOrder(node);
  let cleanedArray = cleanArray(newArray);

  return cleanedArray
}

export { Tree, cleanArray }