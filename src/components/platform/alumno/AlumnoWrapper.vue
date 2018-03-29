<template>
    <div id="alumno-wrapper">
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
        name:'alumnoWrapper',

        components: {
            logoPlatform: LogoPlatform,
            footerPlatform: FooterPlatform
        },

        computed: {
            ...mapGetters({
                isProgram: 'getIsProgram',
            }),
        },

        created(){
            //console.log('created alumnoWrapper');
            this.avoidContextMenu();
        },

        beforeDestroy(){
            //console.log('beforeDestroy alumnoWrapper');
            this.allowContextMenu();
        },

        methods:{
            avoidContextMenu(){
                document.addEventListener('contextmenu', this.listener)
            },

            allowContextMenu(){
                document.removeEventListener('contextmenu', this.listener)
            },

            listener(event){
                event.preventDefault();
            }
        }
    }    
</script>
