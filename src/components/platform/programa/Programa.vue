<template>
    <div class="programa">
      <ProgramaIndice></ProgramaIndice>
      <ProgramaCabecera></ProgramaCabecera>
      <ProgramaContenido></ProgramaContenido>
    </div>
</template>

<script>
    import ProgramaIndice from './ProgramaIndice.vue';
    import ProgramaCabecera from './ProgramaCabecera.vue';
    import ProgramaContenido from './ProgramaContenido.vue';

    export default {
        name:'programa',

        components: {
            ProgramaIndice: ProgramaIndice,
            ProgramaCabecera: ProgramaCabecera,
            ProgramaContenido: ProgramaContenido
        }
    }
</script>

