function updatePrice(productId, productPrice, el)
{
    let price = document.getElementById(`${productId}-price`);
    price.innerHTML= productPrice * el.value;
}

function addRow (product){
    return `<tr>
    <th scope="row"><img src="${product.image}" height="50"/></th>
    <td>${product.name}</td>
    <td>${product.unitCost}</td>
    <td><input onchange="updatePrice(${product.id}, ${product.unitCost}, this)" value="${product.count}"/></td>
    <td>${product.currency} <span id="${product.id}-price">${product.unitCost*product.count}</td>
  </tr>`;
}

function buildCart (products){
    let container = document.getElementById("products-container");
    products.forEach(product => {
        container.innerHTML+=addRow(product);
    });
}

fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json")
.then(response => response.json())
.then(function(data) {
    buildCart(data.articles);
});
