let form = document.getElementById("form-login");

function setAlert(msg){
    document.getElementById("alert-container").innerHTML = `<div class='alert alert-danger alert-dismissible' role='alert'>${msg}</div>`; 
}

function validate(event){
    event.preventDefault();
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    
    if(email.value !== "jap@gmail.com" || password.value !=="123") {
        setAlert("Las credenciales no son validas!");
        return false;
    }
    localStorage.setItem("username", email.value);
    window.location.replace("index.html");
}


form.addEventListener("submit",validate);