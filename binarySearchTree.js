class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  cleanArr(arr) {
    let cleanedArr = [...new Set(arr)];
    cleanedArr.sort((a, b) => a - b);
    return cleanedArr;
  }

  buildTree(arr) {
    arr = this.cleanArr(arr);
    let start = 0;
    let end = arr.length - 1;
    if (start > end) {
      return null;
    }
    let mid = Math.floor(arr.length / 2);
    let node = new Node(arr[mid]);
    node.left = this.buildTree(arr.slice(start, mid));
    node.right = this.buildTree(arr.slice(mid + 1));
    return node;
  }

  insert(data, root = this.root) {
    if (root === null) {
      root = new Node(data);
      return root;
    }
    if (data < root.data) root.left = this.insert(data, root.left);
    if (data > root.data) root.right = this.insert(data, root.right);
    return root;
  }

  delete(data, root = this.root) {
    if (root === null) return root;
    if (data < root.data) root.left = this.delete(data, root.left);
    else if (data > root.data) root.right = this.delete(data, root.right);
    else {
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;
      root.data = this.minValue(root.right);
      root.right = this.delete(root.data, root.right);
    }
    return root;
  }

  minValue(root) {
    let min = root.data;
    while (root.left !== null) {
      min = root.left.data;
      root = root.left;
    }
    return min;
  }

  find(data, root = this.root) {
    if (root === null || root.data === data) return root;
    if (root.data < data) return this.find(data, root.right);
    if (root.data > data) return this.find(data, root.left);
  }

  levelOrder(levelOrderArr = [], queue = [], root = this.root) {
    if (root === null) return;
    //TODO
  }
}

/* function preOrder(node) {
  if (node == null) {
    return;
  }
  document.write(node.data + " ");
  preOrder(node.left);
  preOrder(node.right);
} */

let arr = [15, 6, 5, 1, 1, 2, 4, 7, 7, 10, 11, 8, 9, 13, 12, 15, 14];

let binaryTree = new Tree(arr);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(binaryTree.root);
