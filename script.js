// This code is used to create the array of objects cart
// then it stores the information of cart into local storage
if (localStorage.hasOwnProperty("cart") == false) {
    let cart = [];
    let product = {
        id: null,
        title: null,
        price: null,
        quantity: null,
        img: null,
    }
    cart[0] = product;
    localStorage.setItem('cart', JSON.stringify(cart));
}
createTable();
// Creating the cart local storage if it is not created yet
let btn = document.querySelectorAll(".button");

function createObject() {
 
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", function () {
            event.preventDefault();


            let title = this.getAttribute("title");
            let price = this.getAttribute("price");
            let btnId = this.getAttribute("btnId");
            let figId = this.getAttribute("figId");


            let figExplorer = document.querySelector("#" + figId);

            let figUrl = figExplorer.getAttribute("src");

            let tempCart = localStorage.getItem('cart');
            let cart = JSON.parse(tempCart);

            if (cart[i+1] != null && cart[btnId] != undefined) {
                cart[btnId].quantity++;
            } else {
                product = {
                    id: btnId,
                    title: title,
                    price: price,
                    quantity: 1,
                    img: figUrl
                }
                cart[btnId] = product;
            }
            while (document.querySelector(".tbl tr") != null) {
                let rmvRow = document.querySelector(".tbl tr");
                rmvRow.remove();
            }
            localStorage.setItem('cart', JSON.stringify(cart));            createTable();            totalCalculation();        });
    }
}
createObject();
// creating the table that will be shown into the cart
function createTable() {
    let table = document.querySelector(".tbl");

    let tempCart = localStorage.getItem('cart');
    let cart = JSON.parse(tempCart);

    for (let i = 0; i < cart.length; i++) {
        if (cart[i + 1] != null && cart[i+1].quantity != 0) {

            let row = document.createElement("tr");
            
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
// Calculate the total into the cart
function totalCalculation() {
    let tempCart = localStorage.getItem('cart');
    let cart = JSON.parse(tempCart);
    let totalContent = document.querySelector(".cartContent");
    let placeOrder = document.querySelector("#placeOrder");

    let sum = 0;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i + 1] != null) {
            sum = cart[i + 1].quantity * cart[i + 1].price + sum;
        }
    }

    let totalPrice = document.querySelector(".totalCart");

    if (sum === 0) {
        totalPrice.textContent = "Empty Cart";
        placeOrder.remove();
    }
    else {
        totalPrice.textContent = "Total: $" + sum.toFixed(2);

        if (placeOrder == null) {
            let placeOrderButton = document.createElement("a");
            placeOrderButton.href = "order.html";
            placeOrderButton.id = "placeOrder";
            placeOrderButton.textContent = "Place your order"
            totalContent.appendChild(placeOrderButton);
        }
    }
}
totalCalculation();