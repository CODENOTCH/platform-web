<template>
    <transition name="contentTransition" appear>
        <div class="programa">
            <ProgramaIndice :isIndexOpen="isIndexOpen"></ProgramaIndice>
            <ProgramaCabecera @clickedTab="onClickProgramCabeceraTab"></ProgramaCabecera>
            <ProgramaContenidos v-if="sectionActive === 1"></ProgramaContenidos>
            <ProgramaSlides v-if="sectionActive === 2"></ProgramaSlides>
            <ProgramaDesarrollos v-if="sectionActive === 3"></ProgramaDesarrollos>
        </div>
    </transition>
</template>

<script>
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
                isIndexOpen: false
            }
        },

        methods: {
            onClickProgramCabeceraTab(i,isIndexOpen){
                this.sectionActive = i;
                this.isIndexOpen = isIndexOpen;
            }
        }
    }
</script>

