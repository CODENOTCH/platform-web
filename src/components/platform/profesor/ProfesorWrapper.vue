<template>
    <div id="profesor-wrapper">
        <router-view></router-view>
        <footer-platform></footer-platform>
    </div>
</template>

<script>
    import FooterPlatform from '../comunes/FooterPlatform.vue';

    export default {
        name:'profesorWrapper',

        components: {
            footerPlatform: FooterPlatform
        }
    }    
</script>
