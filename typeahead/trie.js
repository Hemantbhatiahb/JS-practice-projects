class Node {
  constructor() {
    this.links = new Map();
    this.isEnd = false;
  }
  containsKey(char) {
    return this.links.has(char);
  }
  get(char) {
    return this.links.get(char);
  }
  put(char, node) {
    this.links.set(char, node);
  }
  setWordEnd() {
    this.isEnd = true;
  }
  isWordEnd() {
    return this.isEnd;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }
  insertKey(word) {
    let node = this.root;
    for (let ch of word) {
      ch = ch.toLowerCase();
      if (!node.containsKey(ch)) {
        node.put(ch, new Node());
      }
      node = node.get(ch);
    }
    node.setWordEnd();
  }

  searchPrefix(prefix) {
    let node = this.root;
    for (let ch of prefix.toLowerCase()) {
      if (!node.containsKey(ch)) {
        return [];
      }
      node = node.get(ch);
    }
    return this._collectAllWords(node, prefix);
  }

  _collectAllWords(node, prefix) {
    let words = [];
    if (node.isWordEnd()) {
      words.push(prefix);
    }
    for (let [char, nextNode] of node.links) {
      words.push(...this._collectAllWords(nextNode, prefix + char));
    }
    return words;
  }
}

export { Trie };
