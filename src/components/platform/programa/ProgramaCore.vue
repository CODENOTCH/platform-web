<template>
    <div class="programa-core">
        <component :is="sectionActive" :currentData="getCurrentData"></component>
    </div>
</template>

<script>
    import Axios from "axios";
    import { mapGetters } from 'vuex';

    import ProgramaContenidos from './ProgramaContenidos.vue';
    import ProgramaSlides from './ProgramaSlides.vue';
    import ProgramaDesarrollos from './ProgramaDesarrollos.vue';

    export default {
        name:'programaCore',

        components: {
            contenidos: ProgramaContenidos,
            slides: ProgramaSlides,
            desarrollos: ProgramaDesarrollos
        },

        data () {
            return {
                sectionActive: 'contenidos',
                defaultPath: '',
                currentContentsData: [],
                currentSlidesData: [],
                currentDevelopmentsData: [],
                contentSelected: null
            }
        },

        computed: {
            ...mapGetters({
                config: 'getConfigData',
                programData: 'getProgramData'
            }),

            getCurrentData(){
                switch(this.sectionActive){
                    case 'contenidos':
                        return this.currentContentsData;
                    break;
                    case 'slides':
                        return this.currentSlidesData;
                    break;
                    case 'desarrollos':
                        return this.currentDevelopmentsData;
                    break;
                }
            }
        },

        created(){
            this.defaultPath = this.programData.programa[0];
            this.getData(this.defaultPath);
        },

        methods: {
            getSectionData (path) {
                return Axios.get(path)
            },

            getData(path){
                Axios.all([ this.getSectionData(path.contenidosPath),
                            this.getSectionData(path.slidesPath),
                            this.getSectionData(path.desarrolloPath) ])
                    .then(Axios.spread( (...params) => {
                        this.currentContentsData = params[0].data.data;
                        this.currentSlidesData = params[1].data.links;
                        this.currentDevelopmentsData = params[2].data.data;
                    })
                );
            },

            goSectionActive(nameTab){
                this.sectionActive = nameTab;
            },

            updateContent(id){
                this.contentSelected = this.programData.programa.find(item => item.indexId === id);
                this.getData(this.contentSelected);
            }
        }
    }
</script>

