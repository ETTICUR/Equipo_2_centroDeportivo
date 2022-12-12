window.addEventListener('load', () =>{
    let form = document.getElementById('loginForm')
    
    let email = document.getElementById('email')
    let password = document.getElementById('password')
    let errorEmail = document.getElementById("errorEmail");
    let errorPassword = document.getElementById("errorPassword");
    let errores = []

    email.addEventListener('change', (e)=>{
        const re=  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!re.test(email.value)){
            errorEmail.innerText = '*Email invalido'
            errores.push(4);
            
        }else {
            errorEmail.innerText=" ";
            let erroresAct = [];
            for (n of errores) {
              if (n != 4) {
                erroresAct.push(n);
              }
            }
            errores = erroresAct;
          }
        
    });


    password.addEventListener('change', (e)=>{
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if(!re.test(password.value)){
            errorPassword.innerText = '* Ingrese al menos 8 caracteres'
            errores.push(5);
        }else{
            errorPassword.innerText="";
            let erroresActuales = [];
            errores.forEach(error => {
                if(error !== 5) {
                    erroresActuales.push(error);
                }
            })

            errores = erroresActuales;
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
    
    
    
    
    


    
    
})
    
   
