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

  levelOrder(root = this.root) {
    let levelOrderArr = [],
      queue = [];
    if (root === null) return;
    queue.push(root);
    while (queue.length !== 0) {
      root = queue[0];
      levelOrderArr.push(root.data);
      if (root.left !== null) queue.push(root.left);
      if (root.right !== null) queue.push(root.right);
      queue.shift();
    }
    return levelOrderArr;
  }

  preOrder(root = this.root, preOrderArr = []) {
    if (root === null) return;
    preOrderArr.push(root.data);
    this.preOrder(root.left, preOrderArr);
    this.preOrder(root.right, preOrderArr);
    return preOrderArr;
  }

  inOrder(root = this.root, inOrderArr = []) {
    if (root === null) return;
    this.inOrder(root.left, inOrderArr);
    inOrderArr.push(root.data);
    this.inOrder(root.right, inOrderArr);
    return inOrderArr;
  }

  postOrder(root = this.root, postOrderArr = []) {
    if (root === null) return;
    this.postOrder(root.left, postOrderArr);
    this.postOrder(root.right, postOrderArr);
    postOrderArr.push(root.data);
    return postOrderArr;
  }

  treeHeight(root = this.root, height = 0) {
    if (root === null) {
      return -1;
    }
    let leftHeight = this.treeHeight(root.left, height);
    let rightHeight = this.treeHeight(root.right, height);
    height = Math.max(leftHeight, rightHeight) + 1;
    return height;
  }

  nodeHeight(data) {
    if (this.find(data) === null) return "Not a valid node";
    return this.treeHeight() - this.depth(data);
  }

  depth(data, root = this.root, depth = 0) {
    if (root.data === data) {
      return depth;
    }
    if (root === null) {
      return "No Node found with that data";
    }
    if (root.data < data) {
      depth++;
      return this.depth(data, root.right, depth);
    }
    if (root.data > data) {
      depth++;
      return this.depth(data, root.left, depth);
    }
  }

  isBalanced(root = this.root, difference = 0) {
    if (root === null) {
      return -1;
    }
    let leftHeight = this.treeHeight(root.left, difference);
    let rightHeight = this.treeHeight(root.right, difference);
    difference = Math.abs(leftHeight - rightHeight);
    if (difference > 1) return false;
    return true;
  }

  rebalance(root = this.root) {
    let newArr = this.inOrder();
    this.root = this.buildTree(newArr);
    return this.root;
  }
}

let arr = [15, 6, 5, 1, 1, 2, 4, 7, 7, 10, 11, 8, 9, 13, 12, 15, 14, 16];

let binaryTree = new Tree(arr);

// A function to print the BST to the console

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Console tests for the Tree methods

console.log("Here's a pretty visual of our initial tree");
prettyPrint(binaryTree.root);
console.log(`Is it balanced? ${binaryTree.isBalanced()}`);
console.log("Logging tree in level, pre, post, and in order");
console.log(binaryTree.levelOrder());
console.log(binaryTree.preOrder());
console.log(binaryTree.postOrder());
console.log(binaryTree.inOrder());
console.log("Now we unbalance the tree by adding several elements");
binaryTree.insert(100);
binaryTree.insert(105);
binaryTree.insert(125);
binaryTree.insert(130);
prettyPrint(binaryTree.root);
console.log(`Is it balanced? ${binaryTree.isBalanced()}`);
console.log("Now we rebalance the tree");
binaryTree.rebalance();
prettyPrint(binaryTree.root);
console.log(`Is it balanced? ${binaryTree.isBalanced()}`);
console.log("Logging tree in level, pre, post, and in order");
console.log(binaryTree.levelOrder());
console.log(binaryTree.preOrder());
console.log(binaryTree.postOrder());
console.log(binaryTree.inOrder());
console.log("Aren't binary search trees fun?!");
