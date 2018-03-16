<template>
    <transition name="contentTransition" appear>
        <div class="programa">
            <ProgramaIndice @clickedItemIndex="onClickItemIndex" :dataIndex="program.indice" :isIndexOpen="isIndexOpen"></ProgramaIndice>
            <ProgramaCabecera @clickedTab="onClickProgramCabeceraTab"></ProgramaCabecera>
            <ProgramaContenidos v-if="sectionActive === 1" 
                                ref="contentProgram"
                                :firstTime="isFirstTime"
                                :dataContentDefault="program.contenidos[0]" >
            </ProgramaContenidos>
            <ProgramaSlides v-if="sectionActive === 2"></ProgramaSlides>
            <ProgramaDesarrollos v-if="sectionActive === 3"></ProgramaDesarrollos>
        </div>
    </transition>
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
                isFirstTime: true,
                contentSelected: null
            }
        },

        computed: {
            ...mapGetters({
                config: 'getConfigData',
                program: 'getProgramData'
            })
        },

        /*created(){
            console.log(' programa created');
        },

        beforeMount(){
            console.log(' programa beforeMount');
        },

        mounted(){
            console.log(' programa mounted');
        },

        beforeUpdate(){
            console.log(' programa beforeUpdate');
        },

        updated(){
            console.log(' programa updated');
        },*/

        methods: {
            onClickProgramCabeceraTab(i,isIndexOpen){
                this.sectionActive = i;
                this.isIndexOpen = isIndexOpen;
            },

            onClickItemIndex(id){
                if(this.isFirstTime) this.isFirstTime = false;

                let contentSelected = this.program.contenidos.find(item => item.id === id);
                this.contentSelected = contentSelected;
                this.updateContent();
            },

            updateContent(){
                this.$refs.contentProgram.getContent(this.contentSelected.link);
            }
        }
    }
</script>

