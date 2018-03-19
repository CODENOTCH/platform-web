<template>
    <div id="alumno-wrapper">
        <router-view></router-view>
        <footer-platform></footer-platform>
    </div>
</template>

<script>
    import FooterPlatform from '../FooterPlatform.vue';

    export default {
        name:'alumnoWrapper',

        components: {
            footerPlatform: FooterPlatform
        }
    }    
</script>
