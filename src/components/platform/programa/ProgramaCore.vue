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
                defaultContent: '',
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
            this.defaultContent = this.programData.programa[0];
            this.getData(this.defaultContent);
        },

        methods: {
            getSectionData (route) {
                return Axios.get(route)
            },

            getData(content){
                Axios.all([ this.getSectionData(content.contenidosPath),
                            this.getSectionData(content.slidesPath),
                            this.getSectionData(content.desarrolloPath) ])
                    .then(Axios.spread( (...params) => {
                        let contentsData = params[0].data.data;
                        let slidesData = params[1].data[0].Routes;
                        let developmentsData = params[2].data.data;

                        contentsData.sort( (prevItem,nextItem)=>{
                            return prevItem.position - nextItem.position;
                        });

                        developmentsData.sort( (prevItem,nextItem)=>{
                            return prevItem.position - nextItem.position;
                        });


                        this.currentContentsData = contentsData;
                        this.currentSlidesData = slidesData;
                        this.currentDevelopmentsData = developmentsData;
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

