document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('modal').addEventListener('hide.bs.modal', function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    if(localStorage.getItem("logged") == "true"){
      document.querySelectorAll(".only-logged").forEach(element => {
        element.style.display = "block";
      });
      let firstTime = localStorage.getItem("firstTime");
      if (firstTime === "false"){
        document.getElementById("name").value=localStorage.getItem("name");
        document.getElementById("middlename").value=localStorage.getItem("middlename");
        document.getElementById("lastname").value=localStorage.getItem("lastname");
        document.getElementById("lastname2").value=localStorage.getItem("lastname2");
        document.getElementById("phone").value=localStorage.getItem("phone");
      }
      let profileImage = "https://via.placeholder.com/150";
      if(localStorage.getItem("image") !== null && localStorage.getItem("image") !== undefined){
        profileImage = localStorage.getItem("image");
      }
      document.getElementById('profile-user').src = profileImage;
      document.getElementById("email").value=localStorage.getItem("username");
    }else{
        let modal = new bootstrap.Modal(document.getElementById('modal'),[]);
        modal.show();
    }

    document.getElementById("form-profile").addEventListener("submit", function(){
        localStorage.setItem("name", document.getElementById("name").value);
        localStorage.setItem("middlename", document.getElementById("middlename").value);
        localStorage.setItem("lastname", document.getElementById("lastname").value);
        localStorage.setItem("lastname2", document.getElementById("lastname2").value);
        localStorage.setItem("phone", document.getElementById("phone").value);
        localStorage.setItem("firstTime", false);
        localStorage.setItem("image", image);
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
      
              form.classList.add('was-validated')
            }, false)
          })
      })()
}); 

var image = "";

document.getElementById('imagen').addEventListener('change', (e) => {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('profile-user');
      output.src = reader.result;
      image = reader.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});