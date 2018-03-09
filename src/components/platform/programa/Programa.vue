<template>
    <div class="programa">
      <ProgramaIndice></ProgramaIndice>
      <ProgramaCabecera @clicked="onClickProgramCabecera"></ProgramaCabecera>
      <ProgramaContenidos v-if="sectionActive === 1"></ProgramaContenidos>
      <ProgramaSlides v-if="sectionActive === 2"></ProgramaSlides>
      <ProgramaDesarrollos v-if="sectionActive === 3"></ProgramaDesarrollos>
    </div>
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
                sectionActive: 1
            }
        },

        methods: {
            onClickProgramCabecera(i){
                this.sectionActive = i;
            }
        }
    }
</script>

