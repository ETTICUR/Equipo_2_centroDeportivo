window.addEventListener('load', () => {

    document.getElementById('name').focus();

    const form = document.getElementById('form');

    let errores = [];

    const nombre = document.getElementById('name');
    const errorNombre = document.getElementById('errorNombre');
    nombre.addEventListener('change', () => {

        if(nombre.value.length < 4){
            errorNombre.innerText = '* El nombre debe tener más de 3 caracteres.'
            errorNombre.classList.add('asterisco');
            errores.push('ErrorNombre');

        }else{
            errorNombre.innerText = '';
            let erroresActuales = [];
            errores.forEach(error => {
                if(error !== 'ErrorNombre'){
                    erroresActuales.push(error);
                }
            })
            errores = erroresActuales;

        }

    })

    const imagen = document.getElementById('image');
    const errorImagen = document.getElementById('errorImagen');
    imagen.addEventListener('change', () => {

        let arrayImagen = imagen.value.split('.');
        let extImagen = arrayImagen[arrayImagen.length - 1]
        let extPermitidas = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG', 'GIF'];

        if(!extPermitidas.includes(extImagen)){
            errorImagen.innerText = `* Los archivos permitidos son: jpg, jpeg, png, gif.`;
            errorImagen.classList.add('asterisco');
            errores.push('ErrorImagen');

        }else{
            errorImagen.innerText = '';
            let erroresActuales = [];
            errores.forEach(error => {
                if(error !== 'ErrorImagen'){
                    erroresActuales.push(error);
                }
            })
            errores = erroresActuales;

        }

    })


    const descripcion = document.getElementById('description');
    const errorDescripcion = document.getElementById('errorDescription');
    descripcion.addEventListener('change', () => {

        if(descripcion.value.length < 20){
            errorDescripcion.innerText = '* La descripción debe contener más de 20 caracteres.'
            errorDescripcion.classList.add('asterisco');
            errores.push('ErrorDescripcion');

        }else{
            errorDescripcion.innerText = '';
            let erroresActuales = [];
            errores.forEach(error => {
                if(error !== 'ErrorDescripcion'){
                    erroresActuales.push(error)
                }
            })  
            errores = erroresActuales;
        }
    })


    form.addEventListener('submit', e => {

        const errorSubmit = document.getElementById('errorSubmit');

        if(errores.length > 0){
            e.preventDefault();

            errorSubmit.innerText = '* Por favor, revisá que los datos sean correctos.'
            errorSubmit.classList.add('asterisco');

        }else{
            errorSubmit.innerText = '';
            errores = [];
            form.submit();
        }

    })
    
})