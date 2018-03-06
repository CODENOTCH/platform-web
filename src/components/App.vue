<template>
    <main id="app-container">
      <!--Login></Login-->
      <AlumnoHome></AlumnoHome>
      <FooterPlatform></FooterPlatform>
    </main>
</template>

<script>
    import Login from './Login.vue';
    import AlumnoHome from './alumno/AlumnoHome.vue';
    import FooterPlatform from './FooterPlatform.vue';

    export default {
        name:'app',

        components: {
            Login: Login,
            AlumnoHome: AlumnoHome,
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

