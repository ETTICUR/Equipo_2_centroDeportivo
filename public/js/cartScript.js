window.addEventListener("load", () => {
  let totalPrice = document.querySelector(".totalPrice");
  let totalPriceMob = document.querySelector(".totalPriceMob");
  let prices = document.querySelectorAll(".price");

  let total = 0;

  for (let i = 0; i < prices.length; i++) {
    total = total + parseInt(prices[i].textContent);
  }

  totalPrice.textContent = total;
  totalPriceMob.textContent = total;

  document.querySelectorAll(".borrar").addEventListener("click", (e) => {
    e.preventDefault()
  });

  document.querySelectorAll(".finishButton").addEventListener("click",e=>{
    e.preventDefault()
  })
});


