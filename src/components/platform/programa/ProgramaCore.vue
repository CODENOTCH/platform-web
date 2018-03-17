<template>
    <div class="programa-core">
        <ProgramaContenidos v-if="sectionActive === 1" 
                            :currentContentsData="currentContentsData"
                            >
        </ProgramaContenidos>
        <ProgramaSlides v-if="sectionActive === 2"
                            :currentSlidesData="currentSlidesData"
                            >
        </ProgramaSlides>
        <ProgramaDesarrollos v-if="sectionActive === 3"
                             :currentDevelopmentsData="currentDevelopmentsData"
                            >
        </ProgramaDesarrollos>
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
            ProgramaContenidos: ProgramaContenidos,
            ProgramaSlides: ProgramaSlides,
            ProgramaDesarrollos: ProgramaDesarrollos
        },

        data () {
            return {
                sectionActive: 1,
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
            })
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

            goSectionActive(numSectionActive){
                this.sectionActive = numSectionActive;
            },

            updateContent(id){
                this.contentSelected = this.programData.programa.find(item => item.indexId === id);
                this.getData(this.contentSelected);
            }
        }
    }
</script>

