<template>
    <div class="container-btn-scroll" v-scroll="onScroll" :class="{below:editModeActive}">
        <v-btn
              dark
              small
              absolute
              bottom
              left
              fab
              @click="clickHandler"
              class="btn-scroll"
              :class="{visible:isVisible}"
            >
            <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name:'btnScroll',

        data() {
            return {
                offsetTop: 0,
                isVisible: false,
                animOptions : {
                    duration: 350,
                    offset: 0,
                    easing: 'easeInOutCubic'
                }
            };
        },

        computed: mapGetters({
            editModeActive: 'getEditModeActive'
        }),

        methods:{
            clickHandler(){
                this.$vuetify.goTo(0, this.animOptions);
            },

            onScroll(){
                this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
                this.isVisible = this.offsetTop > document.body.clientHeight/4 ? true : false;
            }
        }
    }
</script>

<style lang="scss">
    @import '../scss/styles';

    .container-btn-scroll{
        position: fixed;
        z-index: 3;
        bottom: 100px;
        right: 74px;
        &.below{
            bottom: 45px;
        }
    }
    .btn-scroll{
        color: $white;
        background: $purple;
        transform: scale(.5);
        opacity: 0;
        visibility: hidden;
        @include transition(all,.35s,ease-out,0);
        &.visible{
            transform: scale(1);
            opacity: 1;
            visibility: visible;
        }
    }
</style>