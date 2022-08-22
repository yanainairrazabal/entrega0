let form = document.getElementById("form-login");
let container_listing = document.getElementById("container-listing");
let container_login = document.getElementById("container-login");

function setAlert(msg){
    document.getElementById("alert-container").innerHTML = `<div class='alert alert-danger alert-dismissible' role='alert'>${msg}</div>`; 
}

function validate(event){
    event.preventDefault()
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    if(password.value.length <1) {
        setAlert("El password debe contener caracteres!");
        return false;
    }
    
    if(email.value !== "jap@gmail.com" || password.value !=="123") {
        setAlert("Las credenciales no son validas!");
        return false;
    }
    window.location.replace("index.html");
}


form.addEventListener("submit",validate);