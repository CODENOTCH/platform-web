<template>
    <div id="contabilidad-wrapper">
        <btn-scroll></btn-scroll>
        <logo-platform></logo-platform>
        <router-view></router-view>
        <footer-platform></footer-platform>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import LogoPlatform from '../comunes/LogoPlatform.vue';
    import FooterPlatform from '../comunes/FooterPlatform.vue';
    import BtnScroll from '../../BtnScroll.vue';

    export default {
        name:'contabilidadWrapper',

        components: {
            logoPlatform: LogoPlatform,
            footerPlatform: FooterPlatform,
            btnScroll: BtnScroll
        }
    }    
</script>