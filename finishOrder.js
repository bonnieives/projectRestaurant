// If the order array is not in the local Storage, we create here
if (localStorage.hasOwnProperty("orders") == false) {
    let orders = [];
    let order = {
        id: 0,
        date: null,
        name: null,
        address: null,
        phoneNumber: null,
        special: null,
        products: null
    }
    orders[0] = order;
    localStorage.setItem('orders', JSON.stringify(orders));
}

function finishOrder() {
    let submitOrder = document.querySelector(".checkoutForm")
    // Declaration for the order cart

    function onMySubmit(event) {
        event.preventDefault();
        // Declaration for the order information
        let tempOrder = localStorage.getItem('orders');
        let order = JSON.parse(tempOrder);
        // Getting the date and time
        let currentDate = new Date();
        let h = currentDate.getHours();
        let m = currentDate.getMinutes();
        let s = currentDate.getSeconds();
        let orderMoment = h + ":" + m + ":" + s;
        let idTemp = order.length;

        let tempCart = localStorage.getItem('cart');
        let cart = JSON.parse(tempCart);
        let inCart = [];

        let count = 0;

        for (let i = 0; i < cart.length; i++) {
            if (cart[i] != null && cart[i].quantity != null && cart[i].quantity != 0) {
                let tempTitle = cart[i].title
                let tempQuantity = cart[i].quantity
                
                let orderProduct = {
                    title: tempTitle,
                    quantity: tempQuantity
                }

                inCart[count] = orderProduct;
                count++;
            }
        }

        let orderTemp = {
            id : idTemp,
            date : orderMoment,
            name : cName.value,
            address : addr.value,
            phoneNumber : pNumber.value,
            special: spcl.value,
            products : inCart
        }

        order[order.length] = orderTemp; 

        if (order[0] === null) {
            order.splice[0];
        }

        localStorage.setItem('orders',JSON.stringify(order))

        alert("Order sent to kitchen")
        localStorage.removeItem('cart')
    }   
    submitOrder.addEventListener('submit', onMySubmit);
}
finishOrder();