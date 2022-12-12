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
      errorNombre.textContent = "* Ingrese mas de 2 caracteres";
      errores.push(1);
      console.log(errores);
    } else {
      errorNombre.textContent = "";
      let erroresAct = [];
      for (n of errores) {
        if (n != 1) {
          erroresAct.push(n);
        }
      }
      errores = erroresAct;
    }
  });

  apellido.addEventListener("change", () => {
    if (apellido.value.length < 2) {
      errorApellido.textContent = "* Ingrese mas de 2 caracteres";
      errores.push(2);
    } else {
      errorApellido.textContent = "";
      let erroresAct = [];
      for (n of errores) {
        if (n != 2) {
          erroresAct.push(n);
        }
      }
      errores = erroresAct;
    }
  });

  edad.addEventListener("change", () => {
    if (edad.value < 16) {
      errorEdad.textContent = "* Debe ser mayor de 16 años";
      errores.push(3);
    } else {
      errorEdad.textContent = "";
      let erroresAct = [];
      for (n of errores) {
        if (n != 3) {
          erroresAct.push(n);
        }
      }
      errores = erroresAct;
    }

  });


  email.addEventListener("change", () => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!re.test(email.value)) {
      errorEmail.textContent = "* Email invalido";
      errores.push(4);
    } else {
      errorEmail.textContent = "";
      let erroresAct = [];
      for (n of errores) {
        if (n != 4) {
          erroresAct.push(n);
        }
      }
      errores = erroresAct;
    }
  });
  password.addEventListener("change", () => {
    if (password.value.length < 8) {
      errorPassword.textContent = "* Ingrese al menos 8 caracteres";
      errores.push(5);
    } else {
      errorPassword.textContent = "";
      let erroresAct = [];
      for (n of errores) {
        if (n != 5) {
          erroresAct.push(n);
        }
      }
      errores = erroresAct;
    }
  });

  passwordConfirm.addEventListener("input", () => {
    if (passwordConfirm.value != password.value) {
      errorPasswordConfirm.textContent = "* Las contraseñas deben coincidir";
      errores.push(6);
    } else {
      errorPasswordConfirm.textContent = "";
      let erroresAct = [];
      for (n of errores) {
        if (n != 6) {
          erroresAct.push(n);
        }
      }
      errores = erroresAct;
    }
  });

  form.addEventListener("submit", (e) => {
    if (errores.length > 0) {
      e.preventDefault();
      form.setAttribute("action", "");
      errorRegistro.textContent = "* Revise que todos los campos esten correctos";
    } else {
      errorRegistro.textContent = "";
      form.setAttribute("action", "/register")
    }
  });
});
