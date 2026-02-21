class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word
  insert(word) {
    if (!word) return;

    let node = this.root;
    const lowerWord = word.toLowerCase();

    for (let char of lowerWord) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }

    node.isEnd = true;
  }

  // Prefix autocomplete (traditional Trie behavior)
  autocomplete(prefix) {
    let node = this.root;
    const results = [];
    const lowerPrefix = prefix.toLowerCase();

    // Traverse to prefix node
    for (let char of lowerPrefix) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }

    // Collect words from that node
    const collect = (currentNode, path) => {
      if (currentNode.isEnd) {
        results.push(lowerPrefix + path);
      }

      for (let char in currentNode.children) {
        collect(currentNode.children[char], path + char);
      }
    };

    collect(node, "");
    return results;
  }

  // Get ALL words from Trie
  getAllWords() {
    const results = [];

    const collect = (node, path) => {
      if (node.isEnd) {
        results.push(path);
      }

      for (let char in node.children) {
        collect(node.children[char], path + char);
      }
    };

    collect(this.root, "");
    return results;
  }

  // Substring search (what you want)
  searchIncludes(value) {
    const lowerValue = value.toLowerCase();
    const allWords = this.getAllWords();

    return allWords.filter((word) => word.includes(lowerValue));
  }
}
