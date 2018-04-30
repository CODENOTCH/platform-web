## DOCUMENTACIÓN DEL FRONTEND DE LA PLATAFORMA WEB

### HERRAMIENTAS DESARROLLO

Esta aplicación está desarrollada con el framework **Vue.js** (https://vuejs.org/). Además he utilizado una serie de extensiones y librerías:
* Para el routing, he utilizado **Vue-router** (https://router.vuejs.org/en/)
* Para el store (manejop de datos globales), he utilizado **Vuex** (https://vuex.vuejs.org/en/)
* Para ciertas utilidades y programación funcional, he utilizado **Lodash** (https://lodash.com/)

### ESTRUCTURA

Todos los archivos fuente están en la carpeta src. Dentro de la misma tenemos:

* **index.js**: El punto de entrada de la aplicación

* **template-app.ejs**: Este archivo sirve para generar la plantilla en html

* **COMPONENTS** FOLDER: Este carpeta contiene todos los componentes de la aplicación, divididos por carpetas

* **CONTAINERS** FOLDER: Este carpeta contiene dos archivos:
    * **main.js**: El archivo principal de nuestra aplicación, Este archivo se encarga de cargar los controladores, crear el objeto Vue principal y setear los estados globales del store respecto a la configuración general, los datos de los bootcamps y los datos del programa.
    * **eventBus.js**: Archivo que actua como un singleton para pasar evento de unos componentes a otros (los cuales no tiene relación padre-hijo)
* **ROUTING** FOLDER: Este carpeta contiene el archivo router.js donde se gestiona todas las rutas de la aplicación

* **SCSS** FOLDER: Este carpeta contiene todos los archivos scss de los que se nutren los diferentes componentes. Están divididos por carpetas

* **STORE** FOLDER: Este carpeta contiene los diferentes archivos para la implementación vuex en la plataforma. Se compone de tres archivos:
    * **store.js**: El archivo principal de vuex. Contiene los estados globales con lo que trabajan los componentes
    * **getters.js**: Este archivo contiene los getters para obtener los estados globales
    * **mutations.js**: Este archivo contiene los setters para modificar los estados globales
    
* **STYLE** FOLDER: Este carpeta contiene un par de archivos stylus:
    * **main.styl**: Punto de entrada
    * **vars.styl**: Contiene distintas variables 

### ESTILOS

Para dar estilo a la aplicación, además de utilizar scss para la maquetación, también he utlizado el framework CSS **Bootstrap** (https://getbootstrap.com/).

Además, he utilizado el framework **Vuetify** (https://vuetifyjs.com/en/). Este framework trabaja con stylus y no con scss, por lo cual he tenido que implementar ciertos estilos directamente con el preprocesador de stylus, dentro de los componentes que utilizan elementos de dicho framework. Por esta razón, también son necesarios los archivos que hay en la carpeta STYLUS.

### COMANDOS

* Para arrancar la aplicación en modo desarrollo (localhost:8080), tenemos el comando **NPM RUN DEV**
* Para compilar los archivos y dejarlos listos para producción (en la carpeta public), tenemos el comando **NPM RUN BUILD**

### COMPONENTES

La carpeta componentes contiene cada uno de los componentes necesarios para el funcionamiento de la plataforma. En el root de la carpeta tenemos dos archivos:

* **App.vue**: El componente en el que se cargan el resto de componentes
* **BtnScroll.vue**: El componente que contiene el botón de scroll (cuando lo clickas la página vuelve arriba del todo)

En la carpeta **PLATFORM**, están contenidos todos los componentes de la plataforma, divididos por carpetas:

* **ADMISIONES**: En esta carpeta está el componente contenedor de todos los componentes utilizados en el perfil de *Admisiones*. Además, aquí están todos los componentes que se utilizan específicamente en este perfil, como *ParticipanteDatosCrear.vue* o *ParticipantesDatosEditar.vue* (para la creación y edición de usuarios)

* **ALUMNO**: En esta carpeta está el componente contenedor de todos los componentes utilizados en el perfil de *Alumno*.

* **COMUNES**: En esta carpeta están todos los componentes que son comunes a varios perfiles, como *ListadoParticipantes.vue* o *FooterPlatform.vue* 

* **CONTABILIDAD**: En esta carpeta está el componente contenedor de todos los componentes utilizados en el perfil de *Contabilidad*.

* **LOGIN**: En esta carpeta están todos los componentes que se utilizan específicamente en el *Login*.

* **PROFESOR**: En esta carpeta está el componente contenedor de todos los componentes utilizados en el perfil de *Profesor*. Además, aquí están todos los componentes que se utilizan específicamente en este perfil, como *AlumnoSeguimiento.vue* o *Comentario.vue* (para la creación y edición de usuarios)

* **PROGRAMA**: En esta carpeta están todos los componentes que se utilizan específicamente en la parte de programa, como *Programa.vue* o *ProgramaContenidos.vue*

### EDICIÓN Y CREACIÓN DE USUARIOS

### PROGRAMA

### COMENTARIOS PROFESOR

Todos los componentes relacionados con los comentarios de los alumnos por parte del profesor, están en la carpeta *profesor*. Hay un componente contenedor que es *AlumnoSeguimiento.vue*. En este componenete se cargan varios componentes Comentario (*Comentario.vue*). Dentro de cada componente Comentario. Se cargan dos componentes:

* *ComentarioHeader*: Contiene el nombre de la semana correspondiente y los botones de editar y confirmar
* *ComentarioBox*: Contiene el textarea donde rellenar los comentario y la ventana modal para confirmar, restaurar o continuar editando comentario

### LIMITACIONES

* Cuando se crea un nuevo usuario, son necesarios como mínimo rellenar los campos de FOTO (subir imagen), NAME, DNI, EMAIL. Respecto al tamaño de la foto tiene que medir 160x160px (si no descuadra la composición). PAra el recorte y remuestreado de imágenes recomiendo usar Photoshop o en su lugar esta aplicación web: **ImageResize** (https://imageresize.org/)