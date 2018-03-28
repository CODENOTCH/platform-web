<template>
    <div id="admisiones-wrapper">
        <logo-platform v-if="!isProgram"></logo-platform>
        <router-view></router-view>
        <footer-platform></footer-platform>
    </div>
</template>

<script>
     import { mapGetters } from 'vuex';
    import LogoPlatform from '../comunes/LogoPlatform.vue';
    import FooterPlatform from '../comunes/FooterPlatform.vue';

    export default {
        name:'admisionesWrapper',

        components: {
            logoPlatform: LogoPlatform,
            footerPlatform: FooterPlatform
        },

        computed: {
            ...mapGetters({
                isProgram: 'getIsProgram',
            }),
        }
    }    
</script>