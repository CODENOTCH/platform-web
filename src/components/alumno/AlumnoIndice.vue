<template>
    <div id="alumno-indice">
        <div class="logo-container">
            <h1>
                <img :src="config.imgPath.logo" alt="logo Codenotch">
            </h1>
        </div>
        <div class="indice-container">
            <div class="modulo-container"></div>
            <div class="modulo-container"></div>
            <div class="modulo-container"></div>
        </div>
    </div>
</template>

<script>

 import { mapGetters } from 'vuex';

    export default {
        name:'alumnoIndice',
        computed: mapGetters({
            config: 'getConfigData'
        }),

        data () {
            return {
                
            }
        }
    }
</script>

<style lang="scss">
    @import "../../scss/styles";
</style>