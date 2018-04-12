<template>
    <div id="profesor-wrapper" class="platform-wrapper">
        <btn-scroll></btn-scroll>
        <logo-platform v-if="!isProgram"></logo-platform>
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
        name:'profesorWrapper',

        components: {
            logoPlatform: LogoPlatform,
            footerPlatform: FooterPlatform,
            btnScroll: BtnScroll
        },

        computed: {
            ...mapGetters({
                logged: 'getLogged',
                isProgram: 'getIsProgram'
            }),
        },

        created(){
            if(!this.logged) this.$router.push({ name: 'login'});
        }
    }    
</script>
