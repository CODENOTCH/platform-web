<template>
    <footer id="footer-platform">
        <div class="container-btn-session">
            <v-app>
                <v-container fluid>
                    <v-switch :label="`Cerrar sesión`" v-model="switch1"></v-switch>
                </v-container>
            </v-app>  
        </div>
        <div class="container-breadcrumbs">
            <ul class="list-links">
                <li v-for="(link,index) of breadcrumbs" v-bind:key="index">
                    <a class="link-codenotch disabled" href="#">{{link.text}}</a>
                </li>
            </ul>
        </div>
    </footer>            

</template>

<script>

    export default {
        name:'footerPlatform',
        
        data () {
            return {
                breadcrumbs: [
                    {text:'Prehome',disabled: false},
                    {text:'Home',disabled: false},
                    {text:'Temario',disabled: true}
                ],
                switch1: true
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

  .input-group__details {
      display: none !important
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

