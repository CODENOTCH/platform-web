<template>
    <main id="app-container">
        <transition name="contentTransition" appear>
            <router-view></router-view>
        </transition>
      <!--Login></Login-->
      <!--AlumnoHome></AlumnoHome-->
      <!--Programa></Programa>
      <FooterPlatform></FooterPlatform-->
    </main>
</template>

<script>
    import Login from './platform/Login.vue';
    import AlumnoHome from './platform/alumno/AlumnoHome.vue';
    import Programa from './platform/programa/Programa.vue';
    import FooterPlatform from './platform/FooterPlatform.vue';

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

