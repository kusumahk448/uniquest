const typingTextElement = document.querySelector('.typing-text');

const textToType = 'Unlock Your Future, Explore Endless Possibilities';
let currentIndex = 0;

function typeText() {
  if (currentIndex < textToType.length) {
    typingTextElement.textContent = textToType.substring(0, currentIndex + 1); // <--- changed here
    currentIndex++;
    setTimeout(typeText, 50); // adjust the speed of typing
  }
}

typeText();