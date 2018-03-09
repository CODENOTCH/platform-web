<template>
    <transition name="contentTransition" appear>
        <div class="programa-desarrollos">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-sm-10 offset-sm-1 col-xl-8 offset-xl-2">
                        <h2>1. Banner</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at temp us metus. Ut at eros quis augue consequat 
                        dignissim.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut id velit tristique
                        ligula tempus hendrerit a nec justo. Integer tempor ante ipsum. Ante ipsum primis in eros quisad. </p>
                        <img :src="setPathImgBanner" alt="img desarrollos">
                        <h2>2. Landing-page</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at temp us metus. Ut at eros quis augue consequat 
                        dignissim.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut id velit tristique
                        ligula tempus hendrerit a nec justo. Integer tempor ante ipsum. Ante ipsum primis in eros quisad. </p>
                        <img :src="setPathImgLanding" alt="img desarrollos">
                        <h2>3. Microsite</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at temp us metus. Ut at eros quis augue consequat 
                        dignissim.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut id velit tristique
                        ligula tempus hendrerit a nec justo. Integer tempor ante ipsum. Ante ipsum primis in eros quisad. </p>
                        <img :src="setPathImgMicrosite" alt="img desarrollos">
                    </div>
                </div>
            </div>
        </div>      
    </transition>          
</template>

<script>
    import Axios from "axios";
    import { mapGetters } from "vuex";

    export default {
        name:'programaDesarrollos',
        
        data () {
            return {
            }
        },

        computed: {
            ...mapGetters({
                config: "getConfigData"
            }),

            setPathImgBanner() {
                return process.env.NODE_ENV === "production"
                    ? this.config.imgPathProduction.imgBanner
                    : this.config.imgPathDevelopment.imgBanner;
            },

            setPathImgLanding() {
                return process.env.NODE_ENV === "production"
                    ? this.config.imgPathProduction.imgLanding
                    : this.config.imgPathDevelopment.imgLanding;
            },

            setPathImgMicrosite() {
                return process.env.NODE_ENV === "production"
                    ? this.config.imgPathProduction.imgMicrosite
                    : this.config.imgPathDevelopment.imgMicrosite;
            }
        }
    }
</script>

