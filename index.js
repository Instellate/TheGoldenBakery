/**
 * @typedef {Object} Cake
 * @property {number} count
 * @property {number} price
 */

/**@type {HTMLDivElement}*/
const cart = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const cartButton = document.getElementById('cart-button')

/**
 * @param {string} name 
 * @param {number} price 
 */
function addToCart(name, price) {
    let cakesStr = localStorage.getItem('cart') ?? '{}';

    /**@type {Record<string, Cake>} */
    const cakes = JSON.parse(cakesStr);

    if (cakes[name] === undefined) {
        cakes[name] = {
            count: 1,
            price: price
        }
    } else {
        cakes[name].count++;
    }

    localStorage.setItem('cart', JSON.stringify(cakes));
}

function renderCart() {
    let cakesStr = localStorage.getItem('cart');
    if (cakesStr === null) {
        return;
    }

    cartItems.innerHTML = '';

    /**@type {Record<string, Cake>} */
    const cakes = JSON.parse(cakesStr);

    /**@type {number} */
    let totalPrice = 0;
    for (const [name, cake] of Object.entries(cakes)) {
        const cakeNode = document.createElement('div');
        const nameSpan = document.createElement('span');
        const priceSpan = document.createElement('span');

        cakeNode.className = 'cart-item';
        nameSpan.innerText = `${name} x ${cake.count}`;
        priceSpan.innerText = `${cake.price}kr`;

        cakeNode.appendChild(nameSpan);
        cakeNode.appendChild(priceSpan);
        cartItems.appendChild(cakeNode);

        totalPrice += cake.count * cake.price;
    }

    const totalPriceSpan = document.createElement('span');
    totalPriceSpan.innerHTML = `Totalla pris: <strong>${totalPrice}kr</strong>`
    totalPriceSpan.style = 'margin-top: 0.5rem;';
    cartItems.appendChild(totalPriceSpan);
}

document.addEventListener('click', (e) => {
    if (cartButton.contains(e.target)) {
        return;
    }

    if (!cart.contains(e.target)) {
        cart.style = 'display: none';
    }
})

cartButton.addEventListener('click', () => {
    renderCart();
    cart.removeAttribute('style');
})

/**@type {Array<HTMLButtonElement>} */
const itemButtons = document.querySelectorAll('.item-buttons');

for (const button of itemButtons) {
    button.addEventListener('click', (e) => {
        /**@type {HTMLButtonElement} */
        const target = e.target;

        const cakeItem = target.getAttribute('cake-item');
        const cakePrice = target.getAttribute('cake-price');

        addToCart(cakeItem, Number(cakePrice));
    })
}