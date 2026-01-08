// DOM
const numbersEl = document.getElementById("numbers");

// Numbers
const children = Array.from(numbersEl.children);
children.forEach((child, idx) => {
  const angle = idx * 30;
  child.style.rotate = `${angle}deg`;
});

// To implement
