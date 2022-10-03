let productId= localStorage.getItem("productId");

function setProduct (id){
    localStorage.setItem("productId", id);
    window.location = "product-info.html"
}

function buildRelated(related){
    related.forEach(product => {
        document.getElementById("related-container").innerHTML+=`<div class="col related" onclick="setProduct(${product.id})">
        <div class="bg-image hover-zoom ripple rounded ripple-surface">
        <img src="${product.image}" class="w-100">
        <a href="#!">
        <div class="hover-overlay">
            <div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
        </div>
        </a>
    </div>`;
    });
}

function getProductInformation() {
    fetch(`https://japceibal.github.io/emercado-api/products/${productId}.json`)
.then(response => response.json())
.then(function(data) {
        buildCard(data.id, data.name, data.currency, data.cost, data.images, data.description, data.soldCount, data.category);
        buildRelated(data.relatedProducts);
    });
}

function buildComment(dateTime, user, description, score){
     let scoreHtml = ""; 
    for(i=0;i<5;i++) {
        if(i<score)   { 
            scoreHtml+=`<span class="fa fa-star checked"></span>`;
        }else { 
            scoreHtml+=`<span class="fa fa-star"></span>`;
        }
    }
    return `<div class="col-md-12">
    
    <b>${user}</b> ${dateTime}
     ${scoreHtml} 
    <div class="">
    ${description}
        </div>
    </div> <br>`;
}

function buildComments(comments){
    document.getElementById("comments-container").innerHTML = ""; 
    comments.forEach(comment => {
                document.getElementById("comments-container").innerHTML+= buildComment(comment.dateTime, comment.user, comment.description, comment.score);
    });
}

function getProductComments() {
    fetch(`https://japceibal.github.io/emercado-api/products_comments/${productId}.json`)
.then(response => response.json())
.then(function(data) {
        buildComments(data);
    });
}

function buildCard(id, title, currency, price, images, description, sold, category) {
    document.getElementById("title").textContent=title;
    document.getElementById("price").textContent=price;
    document.getElementById("description").textContent=description;
    document.getElementById("category").textContent=category;
    document.getElementById("sold").textContent=sold;
    
    images.forEach((image, index) => {
        document.getElementById("images-container").innerHTML+=`<div class="carousel-item">
        <img src="${image}" class="d-block w-100" alt=""></div>`;
    });
    let first = document.querySelectorAll(".carousel-item:first-child");
    if(first != undefined){
        first[0].classList.add("active");
    }
    
}
let score = 1;
document.getElementById("score").addEventListener("change", function(){
    let options = this.options[document.getElementById("score").selectedIndex];
    score = options.value;
});

document.addEventListener("DOMContentLoaded", function(e){
    getProductInformation();
    getProductComments();
});

document.getElementById("new-comment").addEventListener("submit", function(e){
    e.preventDefault();
    let message = document.getElementById("comment").value;
    let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    document.getElementById("comments-container").innerHTML+= buildComment(date, localStorage.getItem("username"), message, score);
    document.getElementById("comment").value = "";
});
