<template>
    <div id="alumno-home">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-xl-4 offset-xl-4">
                    <div class="logo-container">
                        <h1>
                            <img :src="config.imgPath.logo" alt="logo Codenotch">
                        </h1>
                    </div>
                </div>
            </div>
        </div>    
        <div class="container-fluid">
             <div class="row">
                <div class="col-12 col-xl-2 offset-xl-2 container-img-codenotch">
                    <img class="img-fluid img-codenotch" :src="config.imgPath.alumno" alt="foto alumno">
                </div> 
                <div class="col-12 col-xl-6">
                    <h2>JAIME DE MIGUEL ALCOBENDAS</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at temp us 
                        metus. Ut at eros quis augue consequat dignissim.Vestibulum ante ipsum
                        primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut id velit
                        tristique ligula tempus hendrerit a nec justo. Integer tempor ante ipsum.
                    </p>
                    <div class="alumnos-links">
                        <ul class="list-links">
                            <li v-for="(link,index) of links" v-bind:key="index">
                                <a class="link-codenotch" href="#">{{link.text}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-2 offset-xl-5">
                    <v-btn class="btn-codenotch">PROGRAMA</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';
    import { mapGetters } from 'vuex';

    export default {
        name:'alumnoHome',
        computed: mapGetters({
            config: 'getConfigData'
        }),
        data: () => ({
            valid: true,
            links: [
                    {text:'Github',disabled: false},
                    {text:'Linkedin',disabled: false},
                    {text:'Twitter',disabled: true}
            ]
        }),
        methods: {
            submit () {
            }
        }
    }
</script>

<style lang="stylus">
  @import '../../stylus/main'
</style>

