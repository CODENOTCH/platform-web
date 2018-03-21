<template>
    <div id="profesor-wrapper">
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
        name:'profesorWrapper',

        components: {
            logoPlatform: LogoPlatform,
            footerPlatform: FooterPlatform,
        },

        computed: {
            ...mapGetters({
                isProgram: 'getIsProgram',
            }),
        }
    }    
</script>
