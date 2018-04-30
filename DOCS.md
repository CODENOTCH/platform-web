## DOCUMENTACIÓN DEL FRONTEND DE LA PLATAFORMA WEB

### ESTRUCTURA

Todos los archivos fuente están en la carpeta src. Dentro de la misma tenemos:

* index.js: El punto de entrada de la aplicación
* template-app.ejs: Este archivo sirve para generar la plantilla en html
* COMPONENTS FOLDER: Este carpeta contiene todos los componentes de la aplicación, divididos por carpetas
* CONTAINERS FOLDER: Este carpeta contiene dos archivos:
    * main.js: El archivo principal de nuestra aplicación, Este archivo se encarga de cargar los controladores, crear el objeto Vue principal y setear los estados globales del store respecto a la configuración general, los datos de los bootcamps y los datos del programa.
    * eventBus.js: Archivo que actua como un singleton para pasar evento de unos componentes a otros (los cuales no tiene relación padre-hijo)
* ROUTING FOLDER: Este carpeta contiene el archivo router.js donde se gestiona todas las rutas de la aplicación
* SCSS FOLDER: Este carpeta contiene todos los archivos scss de los que se nutren los diferentes componentes. Están divididos por carpetas
* STORE FOLDER: Este carpeta contiene los diferentes archivos para la implementación vuex en la plataforma. Se compone de tres archivos:
    * store.js: El archivo principal de vuex. Contiene los estados globales con lo que trabajan los componentes
    * getters.js: Este archivo contiene los getters para obtener los estados globales
    * mutations.js: Este archivo contiene los setters para modificar los estados globales
* STYLE FOLDER: Este carpeta contiene un par de archivos stylus:
    * main.styl: Punto de entrada
    * vars.styl: Contiene distintas variables 

### ESTILOS

Para dar estilo a la aplicación, además de utilizar scss para la maquetación, he utilizado el framework [Vuetify] (https://vuetifyjs.com/en/). Este framework trabaja con stylus y no con scss, por lo cual he tenido que implementar ciertos estilos directamente con el preprocesador de stylus, dentro de los componentes que utilizan elementos de dicho framework. Por esta razón, también son necesarios los archivos que hay en la carpeta STYLUS.

### LIMITACIONES

* Cuando se crea un nuevo usuario, son necesarios como mínimo rellenar los campos de FOTO (subir imagen), NAME, DNI, EMAIL. Respecto al tamaño de la foto tiene que medir 160x160px (si no descuadra la composición). PAra el recorte y remuestreado de imágenes recomiendo usar Photoshop o en su lugar esta aplicación web: [ImageResize] (https://imageresize.org/)