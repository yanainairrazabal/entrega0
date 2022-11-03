
document.addEventListener("DOMContentLoaded", function(){
    document.getElementsByName("shipment-type").forEach((radio) => {
        radio.addEventListener("change", function(){
            updateCosts();
        });
    });

    document.getElementsByName("payment-type").forEach((radio) => {
        radio.addEventListener("change", function(){
            let inputsCreditCard = document.querySelectorAll(".credit-card");
            let inputsTransfer = document.querySelectorAll(".transfer");

            inputsCreditCard.forEach((input)=>{input.disabled = true;});
            inputsTransfer.forEach((input)=>{input.disabled = true;});

            if(radio.value == "credit-card") {
                document.getElementById("selected-payment-type").innerHTML = "Tarjeta de credito";
                inputsCreditCard.forEach((input)=>{input.disabled = false;});
                inputsTransfer.forEach((input)=>{input.disabled = true;});
            }else{
                document.getElementById("selected-payment-type").innerHTML = "Transferencia bancaria";
                inputsTransfer.forEach((input)=>{input.disabled = false;});
                inputsCreditCard.forEach((input)=>{input.disabled = true;});
            }
        });
    });
});

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          validate();
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

function validate() 
{
    let paymentTypeIsSelected = document.querySelectorAll("input[name=payment-type]:checked").length > 0;

    if (!document.getElementById("selected-payment-type-error").classList.contains('d-none')){
        document.getElementById("selected-payment-type-error").classList.add("d-none");
    }

    if(!paymentTypeIsSelected){
        document.getElementById("selected-payment-type-error").classList.remove("d-none");
    }
}

function updateCosts(){
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);

    let subtotal = 0;
    let shippingCost = 0;
    let total = 0;

    cart.forEach((product)=>{
        subtotal += product.count*product.unitCost;
    });

    let radios = document.getElementsByName("shipment-type");
    let selected = Array.from(radios).find(radio => radio.checked);
    let shippingPercentage = 0;
    if (selected != undefined) {
        shippingPercentage = selected.value;
    }
    shippingCost = shippingPercentage*subtotal;
    total = shippingCost + subtotal;
    document.getElementById("subtotal").innerHTML= Math.round(subtotal);
    document.getElementById("shipping-cost").innerHTML= Math.round(shippingCost);
    document.getElementById("total").innerHTML= Math.round(total);
}

function updatePrice(productId, productPrice, el)
{
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);
    
    cart.forEach((p) =>{
        if(p.id == productId){
            p.count = el.value;
        }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    buildCart(cart);
    updateCosts();
}

function addRow (product){
    return `<tr>
    <th scope="row"><img src="${product.image}" height="50"/></th>
    <td>${product.name}</td>
    <td>${product.unitCost}</td>
    <td><input type="number" min="1" required onchange="updatePrice(${product.id}, ${product.unitCost}, this)" value="${product.count}"/><div class="invalid-feedback">No puede estar vacio y debe ser mayor a 0</div></td>
    <td>${product.currency} <span id="${product.id}-price">${product.unitCost*product.count}</td>
  </tr>`;
}

function buildCart (products){
    let container = document.getElementById("products-container");
    container.innerHTML = "";
    products.forEach(product => {
        container.innerHTML+=addRow(product);
    });
}

function getCart() {
    return fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json")
    .then(response => response.json())
    .then(function(data) {
        return data;
    });
}

function syncCart()
{
    fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json")
    .then(response => response.json())
    .then(function(data) {
        let cart = localStorage.getItem("cart");
        if(cart != undefined) {
            cart = JSON.parse(cart);
        }else{
            cart = []; 
        }
    
        let articles = data.articles;

        if(cart != undefined) {
            cart.forEach((product) => {
                articles.forEach((productsApi) =>{
                    if(productsApi.id != product.id) {
                        articles.push(product);
                    }
                });
            });
        }
        localStorage.setItem("cart", JSON.stringify(articles));
        buildCart(articles);
    });
}

syncCart();
