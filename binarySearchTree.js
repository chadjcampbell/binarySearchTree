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
}

/* function preOrder(node) {
  if (node == null) {
    return;
  }
  document.write(node.data + " ");
  preOrder(node.left);
  preOrder(node.right);
} */

let arr = [1, 1, 2, 3, 4, 5, 6, 7, 7];

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
