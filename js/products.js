
function buildCard(title, currency, price, image, description, sold) {
    return `
    <div class="row justify-content-center mt-3 mb-1">
        <div class="col-md-12">
            <div class="card shadow-0 border rounded-3">
                <div class="card-body product">
                    <div class="row">
                        <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                            <div class="bg-image hover-zoom ripple rounded ripple-surface">
                                <img src="${image}" class="w-100">
                                <a href="#!">
                                <div class="hover-overlay">
                                    <div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
                                </div>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-8 col-lg-8 col-xl-8">
                            <h5>${title} - ${currency} ${price}</h5>
                            <p class="text-truncate mb-4 mb-md-0">
                                ${description}
                            </p>
                        </div>
                        <div class="col-md-1 col-lg-1 col-xl-1 border-sm-start-none">
                            <div class="d-flex flex-row align-items-left mb-1">
                                <h4 class="mb-1 me-1">${sold}</h4>
                                <p class="small">vendidos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function buildProducts(products) {
    products.forEach(product => {
        document.getElementById("products-container").innerHTML+= buildCard(product.name, product.currency, product.cost, product.image, product.description, product.soldCount);
    });
}
let productCategory = localStorage.getItem("catID");

fetch(`https://japceibal.github.io/emercado-api/cats_products/${productCategory}.json`)
.then(response => response.json())
.then(function(data) {
    document.getElementById("category-title").innerText=data.catName;
    buildProducts(data.products);
});