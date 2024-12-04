import { Trie } from './trie.js'; 

const availableKeywords = [
  "HTML",
  "CSS",
  "Easy Tutorials",
  "JavaScript",
  "Where too learn coding",
  "Where to two program programming",
  "measures measurement",
  "security  should be",
  "Lighthouse performance security ",
];

const trie = new Trie();
availableKeywords.forEach(phrase => {
    phrase.split(/\s+/).forEach(word => trie.insertKey(word)); // Insert individual words
});

const inputBox = document.getElementById("input-box");
const resultBox = document.querySelector(".result-box");
const ul = document.createElement("ul");

function debounce(fn) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      fn(...args);
    }, 500);
  };
}

const onInputChangeHandler = debounce(onInputChange);
inputBox.addEventListener("keyup", onInputChangeHandler);

function onInputChange(e) {
  const enteredText = e.target.value.trim();
  if (!enteredText) {
    resultBox.innerHTML = "";
    return;
  }

//   const result = getTypeAheads(enteredText);
  const result  = trie.searchPrefix(enteredText);
  if (result.length) {
    display(result);
  } else {
    resultBox.innerHTML = "";
  }
}

const getTypeAheads = (enteredText) => {
  const result = availableKeywords.filter((text) =>
    text.toLowerCase().includes(enteredText.toLowerCase())
  );
  return result;
};

function display(result) {
  resultBox.innerHTML = "";
  const ul = document.createElement("ul");
  result.forEach((data) => {
    let li = document.createElement("li");
    li.innerText = data;
    li.addEventListener("click", selectInput);
    ul.appendChild(li);
  });
  resultBox.appendChild(ul);
}

function selectInput(e) {
  inputBox.value = e.target.innerText;
  resultBox.innerHTML = "";
}
