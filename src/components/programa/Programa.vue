<template>
    <div class="programa">
      <ProgramaIndice></ProgramaIndice>
      <ProgramaContenido></ProgramaContenido>
    </div>
</template>

<script>
    import ProgramaIndice from './ProgramaIndice.vue';
    import ProgramaContenido from './ProgramaContenido.vue';

    export default {
        name:'programa',

        components: {
            ProgramaIndice: ProgramaIndice,
            ProgramaContenido: ProgramaContenido
        }
    }
</script>

<style lang="scss">
    @import "../../scss/styles";
</style>

