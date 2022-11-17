window.addEventListener("load", () => {
  let form = document.getElementById("registerForm");

  let nombre = document.getElementById("nombre");
  let errorNombre = document.getElementById("errorNombre");

  let apellido = document.getElementById("apellido");
  let errorApellido = document.getElementById("errorApellido");

  let edad = document.getElementById("edad");
  let errorEdad = document.getElementById("errorEdad");

  let genero = document.getElementById("genero");
  let errorGenero = document.getElementById("errorGenero");

  let actividad = document.getElementById("actividad");
  let errorActividad = document.getElementById("errorActividad");

  let email = document.getElementById("email");
  let errorEmail = document.getElementById("errorEmail");

  let password = document.getElementById("password");
  let errorPassword = document.getElementById("errorPassword");

  let passwordConfirm = document.getElementById("passwordConfirm");
  let errorPasswordConfirm = document.getElementById("errorPasswordConfirm");

  let errorRegistro = document.getElementById("errorRegistro");

  let errores = [];

  nombre.addEventListener("change", () => {
    if (nombre.value.length < 2) {
      errorNombre.textContent = "Ingrese mas de 2 caracteres";
      errores.push(1);
      console.log(errores);
    } else {
      errorNombre.textContent = "";
      errores = errores.filter(e=>{e!=1})
    }
  });

  apellido.addEventListener("change", () => {
    if (apellido.value.length < 2) {
      errorApellido.textContent = "Ingrese mas de 2 caracteres";
      errores.push(2);
    } else {
      errorApellido.textContent = "";
      let errores = errores.map(e =>{e == 2})
    }
  });

  edad.addEventListener("change", () => {
    if (edad.value < 16) {
      errorEdad.textContent = "Debe ser mayor de 16 años";
      errores.push(3);
    } else {
      errorEdad.textContent = "";
      errores = errores.filter(e=>{e!=3})
    }
  });

  email.addEventListener("change", () => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!re.test(email.value)) {
      errorEmail.textContent = "Email invalido";
      errores.push(4);
    } else {
      errorEmail.textContent = "";
      errores = errores.filter(e=>{e!=4})
    }
  });
  password.addEventListener("change", () => {
    if (password.value.length < 8) {
      errorPassword.textContent = "Ingrese al menos 8 caracteres";
      errores.push(5);
    } else {
      errorPassword.textContent = "";
      errores = errores.filter(e=>{e!=5})
    }
  });

  passwordConfirm.addEventListener("change", () => {
    if (passwordConfirm.value.length < 8) {
      errorPasswordConfirm.textContent = "Ingrese al menos 8 caracteres";
      errores.push(6);
    } else if (passwordConfirm.value != password.value) {
      errorPasswordConfirm.textContent = "Las contraseñas deben coincidir";
      errores.push(6);
    } else {
      errorPasswordConfirm.textContent = "";
      errores = errores.filter(e=>{e!=6})
    }
  });

  form.addEventListener("submit", (e)=>{
    
    if(errores.length > 0){
        e.preventDefault()
        form.setAttribute("action", "")

    }
  })
});
