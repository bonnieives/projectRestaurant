createTable();
function createTable() {
    let table = document.querySelector("#orderTable");

    let tempCart = localStorage.getItem('cart');
    let cart = JSON.parse(tempCart);

    for (let i = 0; i < cart.length; i++) {
        if (cart[i + 1] != null && cart[i + 1].quantity != 0) {

            let row = document.createElement("tr");

            let imageMenu = document.createElement("img");
            let imageCell = document.createElement("td");
            imageMenu.src = cart[i + 1].img;
            imageMenu.className = "orderImage";
            imageCell.appendChild(imageMenu);
            row.appendChild(imageCell);            
            table.appendChild(row);

            let titleCell = document.createElement("td");
            titleCell.textContent = cart[i + 1].title;
            row.appendChild(titleCell);
            table.appendChild(row);

            let quantityCell = document.createElement("td");
            quantityCell.textContent = cart[i + 1].quantity;
            row.appendChild(quantityCell);
            table.appendChild(row);

            let priceCell = document.createElement("td");
            priceCell.textContent = cart[i + 1].quantity * cart[i + 1].price;
            row.appendChild(priceCell);
            table.appendChild(row);

            let addCell = document.createElement("td");
            let addBtn = document.createElement("button");
            addBtn.textContent = "+";
            addBtn.className = "addButton";
            addBtn.addEventListener('click', () => {
                cart[i + 1].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));

                priceCell.textContent = cart[i + 1].quantity * cart[i + 1].price;
                quantityCell.textContent = cart[i + 1].quantity;
                totalCalculation();
            })
            addBtn.id = "addButton" + cart[i + 1].id;
            addCell.appendChild(addBtn);
            row.appendChild(addCell);
            table.appendChild(row);

            let subCell = document.createElement("td");
            let subBtn = document.createElement("button");
            subBtn.textContent = "-";
            subBtn.className = "subButton";
            subBtn.addEventListener('click', () => {

                if (cart[i + 1].quantity > 1) {
                    cart[i + 1].quantity--;
                    localStorage.setItem('cart', JSON.stringify(cart));

                    priceCell.textContent = cart[i + 1].quantity * cart[i + 1].price;
                    quantityCell.textContent = cart[i + 1].quantity;
                } else {
                    cart[i + 1].quantity = 0;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    row.remove();
                }
                totalCalculation();
            })
            subBtn.id = "subButton" + cart[i + 1].id;
            subCell.appendChild(subBtn);
            row.appendChild(subCell);
            table.appendChild(row);

            let removeCell = document.createElement("td");
            let removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove All";
            removeBtn.className = "removeButton";
            removeBtn.id = "removeButton" + cart[i + 1].id;
            removeBtn.addEventListener('click', () => {
                cart[i + 1].quantity = 0;
                localStorage.setItem('cart', JSON.stringify(cart));
                row.remove();
                totalCalculation();
            })
            removeCell.appendChild(removeBtn);
            row.appendChild(removeCell);
            table.appendChild(row);
        }
    }
}
function totalCalculation() {
    let tempCart = localStorage.getItem('cart');
    let cart = JSON.parse(tempCart);

    let sum = 0;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i + 1] != null) {
            sum = cart[i + 1].quantity * cart[i + 1].price + sum;
        }
    }

    let totalPrice = document.querySelector(".totalCart");
    let removeButton = document.querySelector(".checkout")

    if (sum === 0) {
        totalPrice.textContent = "Empty Cart";
        removeButton.remove();
        placeOrder.remove();
    }
    else {
        totalPrice.textContent = "Total: $" + sum.toFixed(2);
    }
}
totalCalculation();
// function to add the checkout button
function checkOutButton() {
    let proceedToCheckout = document.querySelector(".shopCartDiv")

    let tempCart = localStorage.getItem('cart');
    let cart = JSON.parse(tempCart);

    let sum = 0;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i + 1] != null) {
            sum = cart[i + 1].quantity * cart[i + 1].price + sum;
        }
    }

    if (sum != 0) {
        let divCart = document.createElement("div");
        divCart.className = "shopCartNew";
        let aCart = document.createElement("a");
        aCart.className = "checkout";
        aCart.textContent = "Proceed to Checkout";
        aCart.href = "checkout.html";
        divCart.appendChild(aCart);
        proceedToCheckout.appendChild(divCart);
    }
}
checkOutButton()