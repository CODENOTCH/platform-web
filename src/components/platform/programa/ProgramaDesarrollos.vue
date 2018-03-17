<template>
    <div class="programa-desarrollos">
        <div class="container-fluid">
            <div class="row">
                <div class="container-data col-12 col-sm-10 offset-sm-1">
                    <ProgramaDataContenido v-for='(item,i) of currentDevelopmentsData' :key="i">
                        <h2 slot="title" v-if="item.type === 'title'" :key="i">{{item.content}}</h2>
                        <h3 slot="subtitle" v-if="item.type === 'subtitle'" :key="i">{{item.content}}</h3>
                        <img slot="img" v-if="item.type === 'img'" :src="item.content" alt="imagen contenido" :key="i"/>
                        <p slot="text" v-if="item.type === 'text'" v-html="item.content" :key="i"></p>
                        <p slot="list" v-if="item.type === 'list'" class="list-content" v-html="item.content" :key="i"></p>
                    </ProgramaDataContenido>
                </div>    
            </div>
        </div>
    </div>            
</template>

<script>
    import { mapGetters } from "vuex";
    import ProgramaDataContenido from './ProgramaDataContenido.vue';

    export default {
        name:'programaDesarrollos',

        components: {
            ProgramaDataContenido: ProgramaDataContenido
        },
        
        props: ["currentDevelopmentsData"],

        data () {
            return {
            }
        },

        computed: {
            ...mapGetters({
                config: 'getConfigData'
            }),

            setPathImgBanner() {
                return process.env.NODE_ENV === 'production'
                    ? this.config.imgPathProduction.imgBanner
                    : this.config.imgPathDevelopment.imgBanner;
            },

            setPathImgLanding() {
                return process.env.NODE_ENV === 'production'
                    ? this.config.imgPathProduction.imgLanding
                    : this.config.imgPathDevelopment.imgLanding;
            },

            setPathImgMicrosite() {
                return process.env.NODE_ENV === 'production'
                    ? this.config.imgPathProduction.imgMicrosite
                    : this.config.imgPathDevelopment.imgMicrosite;
            }
        },

        created(){
            window.scrollTo(0, 0);
        },

        beforeUpdate(){
            window.scrollTo(0, 0);
        }
    }
</script>

