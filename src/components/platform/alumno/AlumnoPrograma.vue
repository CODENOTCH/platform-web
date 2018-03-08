<template>
    <div id="alumno-programa">
      <AlumnoIndice></AlumnoIndice>
    </div>
</template>

<script>
    import AlumnoIndice from './AlumnoIndice.vue';

    export default {
        name:'alumnoPrograma',

        components: {
            AlumnoIndice: AlumnoIndice
        },

        data () {
            return {

            }
        }
    }
</script>

<style lang="scss">
    @import "../../scss/styles";
</style>

