let productId= localStorage.getItem("productId");

function getProductInformation() {
    fetch(`https://japceibal.github.io/emercado-api/products/${productId}.json`)
.then(response => response.json())
.then(function(data) {
        //document.getElementById("product-title").innerText=data.prodName;
        console.log(data);
        
    });
}

document.addEventListener("DOMContentLoaded", function(e){
    getProductInformation();
});