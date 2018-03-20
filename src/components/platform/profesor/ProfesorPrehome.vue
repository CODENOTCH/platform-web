<template>
    <transition name="contentTransition" appear>
        <div id="profesor-prehome">
            <div id="profesor-home" class="home">
                <div class="container-fluid">
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
            </div>     
            <div class="container-fluid">
                <div class="row">
                </div>
            </div>        
        </div>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name:'profesorPrehome',

        computed: {
            ...mapGetters({
                config: 'getConfigData'
            }),

            setPathLogo() {
                return process.env.NODE_ENV === 'production' ? this.config.imgPathProduction.logo : this.config.imgPathDevelopment.logo
            }
        }
    }    
</script>
