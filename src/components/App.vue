<template>
    <main id="app-container">
      <!--Login></Login>
      <AlumnoHome></AlumnoHome-->
      <Programa></Programa>
      <FooterPlatform></FooterPlatform>
    </main>
</template>

<script>
    import Login from './Login.vue';
    import AlumnoHome from './alumno/AlumnoHome.vue';
    import Programa from './programa/Programa.vue';
    import FooterPlatform from './FooterPlatform.vue';

    export default {
        name:'app',

        components: {
            Login: Login,
            AlumnoHome: AlumnoHome,
            Programa: Programa,
            FooterPlatform: FooterPlatform
        }
    }
</script>

<style lang="scss">
    @import "../scss/styles";
</style>

