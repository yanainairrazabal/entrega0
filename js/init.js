const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function logout(){
  localStorage.setItem("logged", false);
  localStorage.setItem("username", null);
  window.location.replace("login.html");
}

document.addEventListener("DOMContentLoaded", function(){
  if(localStorage.getItem("logged") == "true"){
    document.querySelectorAll(".only-logged").forEach(element => {
      element.style.display = "block";
    });
    document.getElementById("login-link").style.display = "none";
    document.getElementById("username").innerHTML = localStorage.getItem("username");
  }else{
    document.querySelectorAll(".only-logged").forEach(element => {
      element.style.display = "none";
    });
    document.getElementById("login-link").style.display = "block";
    document.getElementById("username").innerHTML = "";
  }
});