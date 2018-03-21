<template>
    <transition name="contentTransition" appear>
        <div id="profesor-bootcamps" class="home bootcamps">
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
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                        <div class="container-bootcamps">
                            <ul>
                                <li v-for='(item,i) of bootcampsList' v-bind:key="i">
                                    <router-link class="link-codenotch" :to="{ name: item.link}">
                                        <span>{{item.content}}</span>
                                    </router-link>  
                                </li>
                            </ul> 
                        </div>
                    </div>    
                </div>
            </div>         
                
        </div>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name:'listadoBootcamps',

        data() {
            return {
                currentDataBootcamps: [],
                bootcampsList: [
                    { content: 'BOOTCAMP - FULLTIME : OCTUBRE / DICIEMBRE 2018', id: 1, link:'https://www.google.com'},
                    /*{ content: 'BOOTCAMP - PARTIME : JUNIO / DICIEMBRE 2018', id: 2, link:'https://www.google.com'},
                    { content: 'BOOTCAMP - FULLTIME : JUNIO / SEPTIEMBRE 2019', id: 3, link:'https://www.google.com'}*/
                ]
            };
        },
        

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
