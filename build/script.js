// script.ts
var typingTextElement = document.querySelector('.typing-text');
var textToType = 'Find Over 250+ in India';
var currentIndex = 0;
function typeText() {
    if (currentIndex < textToType.length) {
        typingTextElement.textContent += textToType[currentIndex];
        currentIndex++;
        setTimeout(typeText, 50); // adjust the speed of typing
    }
}
typeText();
//# sourceMappingURL=script.js.map