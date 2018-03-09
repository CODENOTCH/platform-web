<template>
    <transition name="contentTransition" appear>
        <div class="programa-slides">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-sm-10 offset-sm-1 col-xl-8 offset-xl-2">
                        <embed :src="setPathPdf" width="800" height="600" type='application/pdf'>
                    </div>
                </div>
            </div>
        </div>  
    </transition>          
</template>

<script>
    import Axios from "axios";
    import { mapGetters } from "vuex";

    export default {
        name:'programaSlides',
        
        data () {
            return {
            }
        },

        computed: {
            ...mapGetters({
                config: "getConfigData"
            }),

            setPathPdf() {
                return process.env.NODE_ENV === "production"
                    ? this.config.imgPathProduction.pdfPrueba
                    : this.config.imgPathDevelopment.pdfPrueba;
            },
        }
    }
</script>

