## ** Daily 01/09 

###### * * Tareas: 

○Implementar el registro de usuarios
    ● Deberá incluir los campos mínimos mencionados en el sprint anterior.
    ● Deberá permitir la subida de una imagen de perfil (con Multer).
    ● Deberá encriptar la contraseña ingresada por el usuario (con bcrypt.js).
    ● Deberá guardar los datos enviados en el archivo JSON de usuarios.
○Implementar el login de usuarios
    ● Incluya los campos de email y password.
    ● Verifique la información enviada por el usuario y según el caso:
           *Redireccione a la home o a la página de perfil en caso de éxito y muestre
los datos del usuario en algún lugar del sitio, como el header.
           *Redireccione nuevamente al login en caso de error.
○Implementar la función de recordar al usuario
    ● Utilizar cookies para guardar esa información en el navegador.    
    ● Implementar un middleware de aplicación que busque la cookie y loguee al
usuario en caso de que exista y sus datos sean correctos.
○Implementar rutas de huéspedes y de usuarios
    ● Rutas accesibles por cualquiera → sin cambios
    ● Rutas accesibles solo sin login → redirigen al perfil
    ● Rutas accesibles solo con login → redireccionan al login
###### * * Implementadas: 
○ Actualizar retro
○ Actualizar el tablero de trabajo
○ Actualizar daily.md
○ vista de creación de producto
###### * * Soluciones propuestas:
Generar cronograma de trabajo.
Notificaciones automaticas de TRELLO