<template>
    <div class="container-fluid logo-platform">
        <div class="row">
            <div class="col-12 col-xl-4 offset-xl-4">
                <div class="logo-container">
                    <h1>
                        <router-link v-if="isLinkActive" :to="{ name: 'profesorHome'}">
                            <img :src="setPathLogo" alt="logo Codenotch"/>
                        </router-link> 
                        <img v-else :src="setPathLogo" alt="logo Codenotch"/> 
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
                config: 'getConfigData',
                isBootcamp: 'getIsBootcamp',
                profile: 'getProfile'
            }),   
            
            isLinkActive(){
                let isActiveLink = this.isBootcamp && this.profile === 'profesor' ? true : false; 
                return isActiveLink;
            },

            setPathLogo() {
                return process.env.NODE_ENV === 'production' ? this.config.imgPathProduction.logo : this.config.imgPathDevelopment.logo
            }
        },

         beforeCreate(){
             /* TEMPORAL */ 
            this.$store.commit('setProfile', 'profesor');
        },

        created(){
            //console.log(this.profile)
        }
    }    
</script>
