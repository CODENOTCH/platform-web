<template>
    <div class="programa-contenidos">
        <div class="container-fluid">
             <div class="row">
                <div class="col-12 col-sm-10 offset-sm-1 col-xl-8 offset-xl-2">
                    <h2>Introducción al funcionamiento de Internet</h2>
                    <img :src="setPathImgContenidos1" alt="img contenidos">
                    <p>Internet es una red mundial que para permite la conexión entre ordenadores a través de un protocolo de comunicaciones, formando <strong>una telaraña de información</strong>.</p>
                    <p>Para entender el funcionamiento de internet. hay que tener claros una serie de conceptos:</p>
                    <ul class="list-programa">
                        <li>Cliente: Es el ordenador del usuario.</li>
                        <li>Servidor web o hosting: Es un ordenador que contiene multitud de archivos de información y que "esperan" peticiones de otros ordenadores (clientes), conectados a una red.</li>
                        <li>Navegador web: Es un programa instalado en el ordenador cliente que sirve para pedir e interpretar la información disponible en un servidor.</li>
                    </ul>
                    <p>El funcionamiento es sencillo. El ordenador cliente, a través de un navegador web, hace una petición de información al servidor y éste, a partir de la información solicitada, envía una respuesta de vuelta al ordenador cliente, interpretada por el navegador web.</p>
                    <img :src="setPathImgContenidos2" alt="img contenidos">
                    <p>Esta petición, que hace el ordenador cliente al servidor cuando se escribe una dirección URL en la barra de direcciones del navegador web, se lleva a cabo a través del protocolo http (una serie de normas que se usa para acceder a páginas web).</p>
                    <p>Todos los ordenadores conectados a internet (tanto los ordenadores clientes como los servidores) tienen un identificador único (dirección IP). Para poder acceder desde un navegador web a un servidor web, necesitamos conocer la dirección IP del servidor web. Para facilitar esta tarea, está el sistema de nombres de dominio (DNS) que se encarga de traducir las direcciones IP a un nombre identificativo o Dominio.</p>
                    <p>El servidor nos da una respuesta (a la petición solicitada) en forma de archivos HTML, que el navegador entiende e interpreta, como una página web.</p>
                    <h3>hosting</h3>
                    <p>Para poder acceder directamente a los archivos alojados en un hosting, tenemos el protocolo FTP, que permite transferir datos entre el ordenador cliente y el hosting a través de programas o clientes FTP como Filezilla, Ciberduck o Transmit.</p>
                </div>
            </div>
        </div>
    </div>            
</template>

<script>
    import Axios from "axios";
    import { mapGetters } from "vuex";

    export default {
        name:'programaContenidos',
        
        data () {
            return {
            }
        },

        computed: {
            ...mapGetters({
                config: "getConfigData"
            }),

            setPathImgContenidos1() {
                return process.env.NODE_ENV === "production"
                    ? this.config.imgPathProduction.imgContenidos1
                    : this.config.imgPathDevelopment.imgContenidos1;
            },

            setPathImgContenidos2() {
                return process.env.NODE_ENV === "production"
                    ? this.config.imgPathProduction.imgContenidos2
                    : this.config.imgPathDevelopment.imgContenidos2;
            }
        }
    }
</script>

