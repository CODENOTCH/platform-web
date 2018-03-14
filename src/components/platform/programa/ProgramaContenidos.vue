<template>
    <transition name="contentTransition" appear>
        <div class="programa-contenidos">
            <div class="container-fluid">
                <div class="row">
                    <div class="container-data col-12 col-sm-10 offset-sm-1">
                        <ul>
                            <li v-for='(item,i) of dataParsed' v-bind:key="i">
                                <h2 v-if="item.type === 'title'">{{item.content}}</h2>
                                <img v-if="item.type === 'img'" :src="item.content" alt="imagen contenido"/>
                                <p v-if="item.type === 'text'" v-html="item.content"></p>
                                <p v-if="item.type === 'list'" class="list-content" v-html="item.content"></p>
                                <h3 v-if="item.type === 'subtitle'">{{item.content}}</h3>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>         
    </transition>   
</template>

<script>
    import Axios from 'axios';
    import { mapGetters } from 'vuex';

    export default {
        name:'programaContenidos',
        
        data () {
            return {
                dataContent: {},
                dataParsed: []
            }
        },

        computed: {
            ...mapGetters({
                config: 'getConfigData'
            }),

            setPathImgContenidos1() {
                return process.env.NODE_ENV === 'production'
                    ? this.config.imgPathProduction.imgContenidos1
                    : this.config.imgPathDevelopment.imgContenidos1;
            },

            setPathImgContenidos2() {
                return process.env.NODE_ENV === 'production'
                    ? this.config.imgPathProduction.imgContenidos2
                    : this.config.imgPathDevelopment.imgContenidos2;
            }
        },

        beforeCreate() {
            const dataPath = './public/assets/data/dataProgramContents.json';

            Axios.get(dataPath)
            .then(response => {
                this.dataContent = response.data.data;
                let tempArray = [];
                tempArray.push(this.dataContent);
                this.dataParsed = tempArray[0];
                //this.setDataParsed();
                console.log(this.dataParsed[0]);
            })
            .catch(error => {
                console.log(error);
            });
        },

        created(){
            window.scrollTo(0, 0);
        }
    }
</script>

