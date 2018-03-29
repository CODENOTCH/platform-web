<template>
    <div class="container-btn-scroll"  v-scroll="onScroll">
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
    import TweenMax from 'gsap';
    import ScrollToPlugin from "gsap/ScrollToPlugin";

    export default {
        name:'btnScroll',

        data() {
            return {
                offsetTop: 0,
                isVisible: false
            };
        },

        computed: mapGetters({
            config: 'getConfigData',
            isOnlyMobile: 'getIsOnlyMobile'
        }),

        methods:{
            clickHandler(){
                TweenMax.to(window, 1, {scrollTo:{y:0, ease:Power3.easeout}});
            },

            onScroll(){
                this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;

                if(this.offsetTop > document.body.clientHeight/4){
                    this.isVisible = true;
                } else{
                    this.isVisible = false;
                }
                //console.log('this.offsetTop',this.offsetTop);
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
        right: 65px;
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