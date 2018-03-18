<template>
    <transition name="contentTransition" appear>
        <footer id="footer-platform">
            <div class="container-btn-session" :class="{centered:noBreadcrumbs}">
                <router-link class="link-special-codenotch" :to="{ name: 'login'}">
                    <img :src="setPathIconSession" alt="icono sesión"/>
                    <span>Cerrar sesión</span>
                </router-link>  
            </div>
            <div v-if="!noBreadcrumbs" class="container-breadcrumbs">
                <ul class="list-links">
                    <li v-for="(link,index) of breadcrumbs" v-bind:key="index">
                        <router-link class="link-codenotch" v-if="link.visible" :class="{disabled:link.disabled}" :to="{ name: link.path}">
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
                breadcrumbs: [],
                noBreadcrumbs: false
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
                            {text:'Home', visible:false, disabled: true, path:'alumnoHome'}
                        ],
                        this.noBreadcrumbs = true;
                    break;
                    
                    case 'alumnoPrograma':
                        breadcrumbs = [
                            {text:'Home', visible:true, disabled: false, path:'alumnoHome'},
                            {text:'Programa', visible:true, disabled: true, path:'alumnoPrograma'}
                        ],
                        this.noBreadcrumbs = false;
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

