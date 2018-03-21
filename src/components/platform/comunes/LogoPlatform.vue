<template>
    <div class="container-fluid logo-platform">
        <div class="row">
            <div class="col-12 col-xl-4 offset-xl-4">
                <div class="logo-container">
                    <h1>
                        <img :src="setPathLogo" alt="logo Codenotch"/>
                    </h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import FooterPlatform from '../comunes/FooterPlatform.vue';

    export default {
        name:'profesorWrapper',

        components: {
            footerPlatform: FooterPlatform
        },

        computed: {
            ...mapGetters({
                config: 'getConfigData'
            }),    

            setPathLogo() {
                return process.env.NODE_ENV === 'production' ? this.config.imgPathProduction.logo : this.config.imgPathDevelopment.logo
            }
        },
    }    
</script>
