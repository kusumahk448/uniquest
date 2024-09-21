// script.ts
const typingTextElement = document.querySelector('.typing-text');

const textToType = 'Find Over 250+ in India';
let currentIndex = 0;

function typeText() {
  if (currentIndex < textToType.length) {
    typingTextElement.textContent += textToType[currentIndex];
    currentIndex++;
    setTimeout(typeText, 50); // adjust the speed of typing
  }
}

typeText();