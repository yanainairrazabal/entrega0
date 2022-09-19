let productId= localStorage.getItem("productId");

function getProductInformation() {
    fetch(`https://japceibal.github.io/emercado-api/products/${productId}.json`)
.then(response => response.json())
.then(function(data) {
        buildCard(data.id, data.name, data.currency, data.cost, data.images, data.description, data.soldCount, data.category);
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
    <div class="row">
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
        console.log(data);
        buildComments(data);
    });
}

function buildCard(id, title, currency, price, images, description, sold, category) {
    document.getElementById("title").textContent=title;
    document.getElementById("price").textContent=price;
    document.getElementById("description").textContent=description;
    document.getElementById("category").textContent=category;
    document.getElementById("sold").textContent=sold;
    images.forEach(image => {
        document.getElementById("images-container").innerHTML+=`<div class="col">
        <div class="bg-image hover-zoom ripple rounded ripple-surface">
        <img src="${image}" class="w-100">
        <a href="#!">
        <div class="hover-overlay">
            <div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
        </div>
        </a>
    </div>`;
    });
    
}






document.addEventListener("DOMContentLoaded", function(e){
    getProductInformation();
    getProductComments();
});