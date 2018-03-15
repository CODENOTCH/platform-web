<template>
    <div class="programa">
        <ProgramaIndice @clickedItemIndex="onClickItemIndex" :dataIndex="program.indice" :isIndexOpen="isIndexOpen"></ProgramaIndice>
        <ProgramaCabecera @clickedTab="onClickProgramCabeceraTab"></ProgramaCabecera>
        <ProgramaContenidos v-if="sectionActive === 1" :dataContentDefault="program.contenidos[0]" :dataContent="this.contentSelected"></ProgramaContenidos>
        <ProgramaSlides v-if="sectionActive === 2"></ProgramaSlides>
        <ProgramaDesarrollos v-if="sectionActive === 3"></ProgramaDesarrollos>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    import ProgramaIndice from './ProgramaIndice.vue';
    import ProgramaCabecera from './ProgramaCabecera.vue';
    import ProgramaContenidos from './ProgramaContenidos.vue';
    import ProgramaSlides from './ProgramaSlides.vue';
    import ProgramaDesarrollos from './ProgramaDesarrollos.vue';

    export default {
        name:'programa',

        components: {
            ProgramaIndice: ProgramaIndice,
            ProgramaCabecera: ProgramaCabecera,
            ProgramaContenidos: ProgramaContenidos,
            ProgramaSlides: ProgramaSlides,
            ProgramaDesarrollos: ProgramaDesarrollos
        },

        data () {
            return {
                sectionActive: 1,
                isIndexOpen: false,
                contentSelected:0
            }
        },

        computed: {
            ...mapGetters({
                config: 'getConfigData',
                program: 'getProgramData'
            })
        },

        created(){
           // console.log(this.program.indice);
            console.log('programaContenidos',this.program.contenidos[0]);
        },

        methods: {
            onClickProgramCabeceraTab(i,isIndexOpen){
                this.sectionActive = i;
                this.isIndexOpen = isIndexOpen;
            },

            onClickItemIndex(id){
                let contentSelected = this.program.contenidos.find(item => item.id === id);
                this.contentSelected = contentSelected;
                //console.log('contenidoSelected: ',contentSelected);
                //this.program.contenidos
            }
        }
    }
</script>

