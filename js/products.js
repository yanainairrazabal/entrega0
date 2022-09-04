
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
    document.getElementById("products-container").innerHTML = ""; 
    products.forEach(product => {
        document.getElementById("products-container").innerHTML+= buildCard(product.name, product.currency, product.cost, product.image, product.description, product.soldCount);
    });
}

let productCategory = localStorage.getItem("catID");
let products = null;

function getProductsAndShow() {
    fetch(`https://japceibal.github.io/emercado-api/cats_products/${productCategory}.json`)
.then(response => response.json())
.then(function(data) {
        document.getElementById("category-title").innerText=data.catName;
        products = data.products;
        buildProducts(data.products);
    });
}

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function isInPriceRange(product){
    return (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)));
}

function sortAndShowCategories(sortCriteria){
    currentSortCriteria = sortCriteria;
    products = sortCategories(currentSortCriteria, products);
    buildProducts(products);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getProductsAndShow();

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;
        
        getProductsAndShow();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        let sorted = products.filter(isInPriceRange);
        buildProducts(sorted);
    });
});