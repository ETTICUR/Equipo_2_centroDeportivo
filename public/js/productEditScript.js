window.addEventListener('load', () => {

    document.getElementById('name').focus();

    const form = document.getElementById('form');

    let errores = [];

    const name = document.getElementById('name');
    const errorName = document.getElementById('errorNombre');
    name.addEventListener('change', () => {
        if(name.value.length < 4) {
            errorName.innerText = '* El nombre debe tener mas de tres caracteres.';
            errorName.classList.add('asterisco');
            errores.push('errorName');
            
            
        }else{
            errorName.innerText = '';

            let erroresActuales = [];
            errores.forEach(error => {
                if(error !== 'errorName') {
                    erroresActuales.push(error);
                }
            })
            errores = erroresActuales;
            

        }
    })

    const imagen = document.getElementById('image');
    const errorImagen = document.getElementById('errorImagen');
    imagen.addEventListener('change', ( )=> {

        let arrayImagen = imagen.value.split('.');
        let extImage = arrayImagen[arrayImagen.length - 1 ];
        let extPermitidas = ['jpg', 'png', 'jpeg', 'gif', 'JPG', 'PNG', 'JPEG', 'GIF'];


        if(!extPermitidas.includes(extImage)) {
            errorImagen.innerText = '* Los archivos permitidos son: jpg, png, gif, jpeg.';
            errorImagen.classList.add('asterisco');
            errores.push('errorImagen');
            
        }else{
            errorImagen.innerText = '';
            let erroresActuales = [];
            errores.forEach(error => {
                if(error !== 'errorImagen') {
                    erroresActuales.push(error);
                }
                
            })

            errores = erroresActuales;
            
        }
        

    })

    const descripcion = document.getElementById('description');
    const errorDescription = document.getElementById('errorDescripcion');
    descripcion.addEventListener('change', () => {
        if(descripcion.value.length < 20) {
            errorDescription.innerText = '* La descripcion debe contener mas de 20 caracteres.';
            errorDescription.classList.add('asterisco');
            errores.push('errorDescripcion');
        }else{
            errorDescription.innerText = '';
            let erroresActuales = [];
            errores.forEach(error => {
                if(error !== 'errorDescripcion') {
                    erroresActuales.push(error)
                }
            })

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