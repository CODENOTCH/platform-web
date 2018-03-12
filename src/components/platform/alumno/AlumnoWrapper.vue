<template>
    <div id="alumno-wrapper">
        <router-view></router-view>
        <FooterPlatform></FooterPlatform>
    </div>
</template>

<script>
    import FooterPlatform from '../FooterPlatform.vue';

    export default {
        name:'alumnoWrapper',

        components: {
            FooterPlatform: FooterPlatform
        }
    }    
</script>
