## DOCUMENTACIÓN DEL FRONTEND DE LA PLATAFORMA WEB

### HERRAMIENTAS DESARROLLO

Esta aplicación está desarrollada con el framework **Vue.js** (https://vuejs.org/). Además he utilizado una serie de extensiones y librerías:
* Para consumir la API del backend, a través de llamadas asíncronas , he utilizado **Axios** (https://github.com/axios/axios)
* Para el routing, he utilizado **Vue-router** (https://router.vuejs.org/en/)
* Para el store (manejo de datos globales), he utilizado **Vuex** (https://vuex.vuejs.org/en/)
* Para ciertas utilidades y programación funcional, he utilizado **Lodash** (https://lodash.com/)

### ESTRUCTURA

Todos los archivos fuente están en la carpeta src. Dentro de la misma tenemos:

* **index.js**: El punto de entrada de la aplicación

* **template-app.ejs**: Este archivo sirve para generar la plantilla en html

* **controller.js**: Este archivo se encarga de cargar los datos, crear el objeto Vue principal y setear los estados globales del store respecto a la configuración general, los datos de los bootcamps y los datos del programa

* **eventBus.js**: Archivo que actua como un singleton para pasar evento de unos componentes a otros (los cuales no tiene relación padre-hijo)

* **COMPONENTS** FOLDER: Este carpeta contiene todos los componentes de la aplicación, divididos por carpetas
    
* **ROUTING** FOLDER: Este carpeta contiene el archivo router.js donde se gestiona todas las rutas de la aplicación

* **SCSS** FOLDER: Este carpeta contiene todos los archivos scss de los que se nutren los diferentes componentes. Están divididos por carpetas

* **STORE** FOLDER: Este carpeta contiene los diferentes archivos para la implementación vuex en la plataforma. Se compone de tres archivos:
    * **store.js**: El archivo principal de vuex. Contiene los estados globales con lo que trabajan los componentes
    * **getters.js**: Este archivo contiene los getters para obtener los estados globales
    * **mutations.js**: Este archivo contiene los setters para modificar los estados globales

* **STYLE** FOLDER: Este carpeta contiene un par de archivos stylus:
    * **main.styl**: Punto de entrada
    * **vars.styl**: Contiene distintas variables 

### DATOS

Los datos están divididos en dos grandes grupos:

* **BOOTCAMP DATA**: Para acceder a esta información, el controller.js hace una llamada GET al servidor con el siguiente endpoint: *https://www.codenotch.com/bootcamps/getBootcampData*. Este nos devuelve un JSON que contiene todos los datos de cada Bootcamp, como el nombre del Bootcamp, el id del Bootcamp o las semanas del mismo. Además, también incluye la lista de estudiantes y la lista de profesores. Este JSON se almacena en el STORE y se utiliza posteriormente para rellenar la info de los usuarios.

* **PROGRAM DATA**: Para acceder a esta información, el controller.js hace una llamada GET al servidor con el siguiente endpoint: *https://www.codenotch.com/content/programData*. Este nos devuelve un JSON que contiene todos los datos del programa, tanto los datos del índice, como los datos de cada contenido, de cada slide, y de cada desarrollo. Este JSON se almacena en el STORE y se utiliza posteriormente para rellenar la info de los contenidos y los desarrollos.


### ESTILOS

Para dar estilo a la aplicación, además de utilizar **SCSS** para la maquetación, también he utlizado el framework CSS **Bootstrap** (https://getbootstrap.com/).

Además, he utilizado el framework **Vuetify** (https://vuetifyjs.com/en/). Este framework trabaja con *stylus*, por lo cual he tenido que implementar ciertos estilos directamente con el preprocesador de stylus, dentro de los componentes que utilizan elementos de dicho framework. Por esta razón, también son necesarios los archivos que hay en la carpeta STYLUS.

### COMANDOS

* Para arrancar la aplicación en modo desarrollo (localhost:8080), tenemos el comando **NPM RUN DEV**
* Para compilar los archivos y dejarlos listos para producción (en la carpeta public), tenemos el comando **NPM RUN BUILD**

### COMPONENTES

La carpeta componentes contiene cada uno de los componentes necesarios para el funcionamiento de la plataforma. En el root de la carpeta tenemos dos archivos:

* **App.vue**: El componente en el que se cargan el resto de componentes
* **BtnScroll.vue**: El componente que contiene el botón de scroll (cuando lo clickas la página vuelve arriba del todo)

En la carpeta **PLATFORM**, están contenidos todos los componentes de la plataforma, divididos por carpetas:

* **ADMISIONES**: En esta carpeta está el componente contenedor de todos los componentes utilizados en el perfil de *Admisiones*. Además, aquí están todos los componentes que se utilizan específicamente en este perfil, como *ParticipanteDatosCrear.vue* o *ParticipantesDatosEditar.vue* (para la creación y edición de usuarios)

* **ALUMNO**: En esta carpeta está el componente contenedor de todos los componentes utilizados en el perfil de *Alumno*

* **COMUNES**: En esta carpeta están todos los componentes que son comunes a varios perfiles, como *ListadoParticipantes.vue* o *FooterPlatform.vue* 

* **CONTABILIDAD**: En esta carpeta está el componente contenedor de todos los componentes utilizados en el perfil de *Contabilidad*

* **LOGIN**: En esta carpeta están todos los componentes que se utilizan específicamente en el *Login*

* **PROFESOR**: En esta carpeta está el componente contenedor de todos los componentes utilizados en el perfil de *Profesor*. Además, aquí están todos los componentes que se utilizan específicamente en este perfil, como *AlumnoSeguimiento.vue* o *Comentario.vue* (para la creación y edición de usuarios)

* **PROGRAMA**: En esta carpeta están todos los componentes que se utilizan específicamente en la parte de programa, como *Programa.vue* o *ProgramaContenidos.vue*

### EDICIÓN Y CREACIÓN DE USUARIOS

Estas dos acciones solo pueden ejecutar desde el perfil de admisiones, tanto para crear estudiantes como para crear profesores:

* *EDICIÓN*: El componente que contiene la lógica de la edición de usuarios es *ParticipanteDatosEditar* (de la carpeta admisiones). Este componente es contenedor del componente *ParticipantesModal* usado para la creación de las ventanas modales.
* *CREACIÓN*: El componente que contiene la lógica de la creación de usuarios es *ParticipanteDatosCrear* (de la carpeta admisiones). Este componente es contenedor del componente *ParticipantesModal* usado para la creación de las ventanas modales. Por otro lado, el componente *ParticipanteDatosCrear* es contenedor de los componentes *ParticipanteDatoLink*, *ParticipanteDatoLinkEditar* y *ParticipanteDatoLinkNuevo* que se encargan de la lógica para crear y editar nuevos links.

### PROGRAMA

Al programa solo se puede acceder desde los perfiles de estudiante y profesor. Hay un componente contenedor *Programa* que encapsula otros tres componentes:

* *ProgramaCabecera*: Este componente contiene el menu superior con los botones de CONTENIDOS, SLIDES y DESARROLLOS.
* *ProgramaIndice*: Este componente contiene el menu lateral con el indice de los contenidos. A su vez contiene el componente *ProgramaItemIndice*
* *ProgramaCore*: Este componente contiene a su vez otros tes componentes con los datos de los CONTENIDOS, SLIDES y DESARROLLOS:
    * *ProgramaContenidos*: Este componente se encarga de los datos de los contenidos y a su vez contiene el componente *ProgramaDataContenido*
    * *ProgramaSlides*: Este componente se encarga de embeber las slides
    * *ProgramaDesarrollos*: Este componente se encarga de los datos de los desarrollos y a su vez contiene el componente *ProgramaDataContenido*

El componente *Programa* se encarga de pasar datos de unos componentes a otros (por ejemplo de ProgramaCabecera a ProgramaCore)

### COMENTARIOS PROFESOR

Esta acción solo se puede realizar desde el perfil de profesor.

Todos los componentes relacionados con los comentarios de los alumnos por parte del profesor, están en la carpeta *profesor*. Hay un componente contenedor que es *AlumnoSeguimiento.vue*. En este componenete se cargan varios componentes Comentario (*Comentario.vue*). Dentro de cada componente Comentario. Se cargan dos componentes:

* *ComentarioHeader*: Contiene el nombre de la semana correspondiente y los botones de editar y confirmar
* *ComentarioBox*: Contiene el textarea donde rellenar los comentario y la ventana modal para confirmar, restaurar o continuar editando comentario

### LIMITACIONES

* Es necesario que exista al menos un usuario de cada perfil y un bootcamp para que la plataforma funcione
* Cuando se crea un nuevo usuario, son necesarios como mínimo rellenar los campos de FOTO (subir imagen), NAME, DNI, EMAIL. Respecto al tamaño de la foto tiene que medir 160x160px (si no descuadra la composición). Para el recorte y remuestreado de imágenes recomiendo usar Photoshop o en su lugar esta aplicación web: **ImageResize** (https://imageresize.org/)