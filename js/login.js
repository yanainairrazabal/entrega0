let form = document.getElementById("form-login");
let container_listing = document.getElementById("container-listing");
let container_login = document.getElementById("container-login");

function validate(event){
    event.preventDefault()
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    
    if(password.value.length <1) {
        alert("El password no puede estar vacío");
        return false;
    }
    
    if(email.value.length <1) {
        alert("El email debe contener caracteres");
        return false;
    }
    
    if(email.value !== "jap@gmail.com" || password.value !=="123") {
        alert("Los datos ingresados no son correctos");
        return false;
    }
    window.location.replace("listing.html");

}

form.addEventListener("submit",validate);