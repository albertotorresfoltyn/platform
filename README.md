# platform
Esqueleto de sistema, lado server en app, lado frontend en frontend
##app
Aplicacion node con mongoose y monk... uso las dos tecnologias de acceso a mongo para separar. El usuario y contraseña se autentican con mongoose. Asi el modelo de usuario puede ser mas completo.

La parte de monk se usa para poder leer y crear entidades sin estructura, basicamente podes insertar cualquier tipo de documento en cualquier coleccion, siempre y cuando estes autenticado

La autenticacion es con jwt-simple, es por token

##frontend
Stack react bastante simple, jeet, stylus y un poco mas. Los errores se ven re lindos en un rojo horrible en la aplicacion
