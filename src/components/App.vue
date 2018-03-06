<template>
    <main id="app-container">
      <!--Login></Login-->
      <AlumnoHome></AlumnoHome>
    </main>
</template>

<script>
    import Login from './Login.vue';
    import AlumnoHome from './alumno/AlumnoHome.vue';
    import Footer from './Footer.vue';

    export default {
        name:'app',

        components: {
            Login: Login,
            AlumnoHome: AlumnoHome,
            Footer: Footer
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

