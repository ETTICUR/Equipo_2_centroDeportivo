window.addEventListener("load", () => {
  let num = 1;

  let contador = document.getElementById("contadorDetail");

  contador.setAttribute("value", num);

  let sumar = document.getElementById("flechaSumar");
  let restar = document.getElementById("flechaRestar");

  sumar.addEventListener("click", () => {
    num++;
    contador.setAttribute("value", num);
  });
  restar.addEventListener("click", () => {
    if (num <= 0) {
      num = 0;
    } else {
      num--;
      contador.setAttribute("value", num);
    }
  });

  let agregarCarrito = document.getElementById("agregarACarrito");

  agregarCarrito.addEventListener("click", (e) => {
    e.preventDefault();
  });
});
