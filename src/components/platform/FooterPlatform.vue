<template>
    <transition name="contentTransition" appear>
        <footer id="footer-platform">
            <div class="container-btn-session">
                <!--v-app>
                    <v-container fluid>
                        <router-link :to="{ name: 'login'}">
                            <v-switch :label="`Cerrar sesión`" v-model="switch1"></v-switch>
                        </router-link>
                    </v-container>
                </v-app-->
                <router-link class="link-special-codenotch" :to="{ name: 'login'}">
                    <img :src="setPathIconSession" alt="icono sesión"/>
                    <span>Cerrar sesión</span>
                </router-link>  
            </div>
            <div class="container-breadcrumbs">
                <ul class="list-links">
                    
                    <li v-for="(link,index) of breadcrumbs" v-bind:key="index">
                        <!--a class="link-codenotch">{{link.text}}</a-->
                        <router-link class="link-codenotch" :class="{disabled:link.disabled}" :to="{ name: link.path}">
                            <span>{{link.text}}</span>
                        </router-link>  
                    </li>
                </ul>
            </div>
        </footer>            
    </transition>
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        name:'footerPlatform',
        
        data () {
            return {
                breadcrumbs: []
                /*switch1: true*/
            }
        }, 

        computed: {
            ...mapGetters({
                config: 'getConfigData',
                profile: 'getProfile'
            }),

            setPathIconSession() {
                return process.env.NODE_ENV === 'production'
                    ? this.config.imgPathProduction.iconSesion
                    : this.config.imgPathDevelopment.iconSesion;
            },
        },

        created(){
            this.setBreadcrumbs();
        },

        watch: {
            '$route': 'setBreadcrumbs'
        },

        methods: {
            setBreadcrumbs(){
                let breadcrumbs = null; 

                switch(this.$route.name){
                    case 'alumnoHome':
                        breadcrumbs = [
                            {text:'Home', disabled: true, path:'alumnoHome'}
                        ]
                    break;
                    
                    case 'alumnoPrograma':
                        breadcrumbs = [
                            {text:'Home', disabled: false, path:'alumnoHome'},
                            {text:'Programa', disabled: true, path:'alumnoPrograma'}
                        ]
                    break;
                }

                this.breadcrumbs = breadcrumbs;
            }
        }
    }
</script>

<style lang='stylus'>
  @import '../../stylus/main'

  .application--wrap {
    display: block !important
    min-height: inherit !important
  }

  /*.input-group__details {
      display: none !important
  }*/

  .container {
    padding: 0 
  }

  .application.theme--light {
    background: transparent;
    }

  .theme--light .switch .input-group--selection-controls__ripple--active:after, .application .theme--light.switch .input-group--selection-controls__ripple--active:after {
    background-color: $purple 
  }

  .input-group.input-group--selection-controls.switch .input-group--selection-controls__toggle {
    background-color: $purple 
  }

  .input-group.input-group--selection-controls.switch label {
    padding-left: 16px 
    color: $purple
    font-weight: 600
  }
</style>

