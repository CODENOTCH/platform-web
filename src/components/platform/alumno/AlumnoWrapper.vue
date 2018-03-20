<template>
    <div id="alumno-wrapper">
        <router-view></router-view>
        <footer-platform></footer-platform>
    </div>
</template>

<script>
    import FooterPlatform from '../comunes/FooterPlatform.vue';

    export default {
        name:'alumnoWrapper',

        components: {
            footerPlatform: FooterPlatform
        }
    }    
</script>
