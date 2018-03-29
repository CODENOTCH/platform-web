<template>
    <div id="contabilidad-wrapper">
        <logo-platform></logo-platform>
        <router-view></router-view>
        <footer-platform></footer-platform>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import LogoPlatform from '../comunes/LogoPlatform.vue';
    import FooterPlatform from '../comunes/FooterPlatform.vue';

    export default {
        name:'contabilidadWrapper',

        components: {
            logoPlatform: LogoPlatform,
            footerPlatform: FooterPlatform
        }
    }    
</script>