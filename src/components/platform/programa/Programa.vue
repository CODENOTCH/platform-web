<template>
    <div class="programa">
      <ProgramaIndice></ProgramaIndice>
      <ProgramaCabecera></ProgramaCabecera>
      <!--ProgramaContenidos></ProgramaContenidos-->
      <ProgramaSlides></ProgramaSlides>
      <!--ProgramaDesarrollos></ProgramaDesarrollos-->
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
        }
    }
</script>

