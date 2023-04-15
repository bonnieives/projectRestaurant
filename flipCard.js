// Flip card
const cards = document.querySelectorAll(".cards .product");

function flipCard() {
    this.classList.toggle("flip");
}
cards.forEach((card) => card.addEventListener("click", flipCard));
//flipCard();