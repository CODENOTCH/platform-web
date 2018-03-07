<template>
    <main id="app-container">
      <!--Login></Login-->
      <AlumnoHome></AlumnoHome>
      <FooterPlatform></FooterPlatform>
      <!--AlumnoPrograma></AlumnoPrograma-->
    </main>
</template>

<script>
    import Login from './Login.vue';
    import AlumnoHome from './alumno/AlumnoHome.vue';
    import AlumnoPrograma from './alumno/AlumnoPrograma.vue';
    import FooterPlatform from './FooterPlatform.vue';

    export default {
        name:'app',

        components: {
            Login: Login,
            AlumnoHome: AlumnoHome,
            AlumnoPrograma: AlumnoPrograma,
            FooterPlatform: FooterPlatform
        },

        data () {
            return {

            }
        }
    }
</script>

<style lang="scss">
    @import "../scss/styles";
</style>

