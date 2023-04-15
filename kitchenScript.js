function kitchen() {

    let kit = document.querySelector(".kitchenSection")
    let tempOrders = localStorage.getItem('orders');
    let order = JSON.parse(tempOrders);
    
    for (let i = 0; i < tempOrders.length; i++) {
        if (order[i + 1] != null && order[i + 1].quantity != 0) {

            let tableOrder = document.createElement('table');
            let orderRow = document.createElement('th')
            orderRow.colSpan = 3;
            orderRow.textContent = "Order";

            let dateRow = document.createElement('tr');
            let dateCell = document.createElement('td');
            dateCell.colSpan = 3;
            dateCell.textContent = order[i + 1].date;
            dateRow.appendChild(dateCell)

            let nameRow = document.createElement('tr');
            let nameCell = document.createElement('td');
            nameCell.colSpan = 3;
            nameCell.textContent = "Client Name: " + order[i + 1].name;
            nameRow.appendChild(nameCell)


            let addressRow = document.createElement('tr');
            let addressCell = document.createElement('td');
            addressCell.colSpan = 3;
            addressCell.textContent = "Client Address: " + order[i + 1].address;
            addressRow.appendChild(addressCell)

            let phoneRow = document.createElement('tr');
            let phoneCell = document.createElement('td');
            phoneCell.colSpan = 3;
            phoneCell.textContent = "Phone Number: " + order[i + 1].phoneNumber;
            phoneRow.appendChild(phoneCell);

            tableOrder.appendChild(orderRow)
            tableOrder.appendChild(dateRow)
            tableOrder.appendChild(nameRow)
            tableOrder.appendChild(addressRow)
            tableOrder.appendChild(phoneRow)

            for (let j = 0; j < order[i + 1].products.length; j++) {
                if (order[i + 1].products[j] != null) {
                    let productRow = document.createElement('tr')
                    let productHeader = document.createElement('th')
                    productHeader.textContent = "Product #" + (j+1);
                    productRow.appendChild(productHeader)

                    let productNameCell = document.createElement('td')
                    productNameCell.textContent = order[i + 1].products[j].title;
                    productRow.appendChild(productNameCell)

                    let productQuantityCell = document.createElement('td')
                    productQuantityCell.textContent = order[i + 1].products[j].quantity;
                    productRow.appendChild(productQuantityCell)

                    tableOrder.appendChild(productRow);
                }
            }

            let specialRow = document.createElement('tr');
            let specialCell = document.createElement('td');
            specialCell.colSpan = 3;
            specialCell.textContent = order[i + 1].special;
            specialRow.appendChild(specialCell);

            tableOrder.appendChild(specialRow)

            let removeRow = document.createElement("tr");
            let removeBtn = document.createElement("button");
            let removeBtnCell = document.createElement("td");
            removeBtnCell.colSpan = 3;
            removeBtn.textContent = "Order Done";
            removeBtn.addEventListener('click', () => {
                tableOrder.remove();
                order.splice(i + 1, 1)
                localStorage.setItem('orders', JSON.stringify(order))
            })

            removeBtnCell.appendChild(removeBtn)
            removeRow.appendChild(removeBtnCell)
            tableOrder.appendChild(removeRow)

            kit.appendChild(tableOrder)
        }
    }

    localStorage.setItem('orders',JSON.stringify(order))
}
kitchen()

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.querySelector('#dateTime').innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}
startTime()