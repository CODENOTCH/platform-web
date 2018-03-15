<template>
    <transition name="contentTransition" appear>
        <div class="programa-contenidos">
            <div class="container-fluid">
                <div class="row">
                    <div class="container-data col-12 col-sm-10 offset-sm-1">
                        <ul>
                            <li v-for='(item,i) of currentDataParsed' v-bind:key="i">
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
import Axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "programaContenidos",

  props: ["dataContentDefault","dataContent"],

  data() {
    return {
      currentDataContent: {},
      currentDataParsed: []
    };
  },

  computed: {
    ...mapGetters({
      config: "getConfigData"
    }),

    setPathImgContenidos1() {
      return process.env.NODE_ENV === "production"
        ? this.config.imgPathProduction.imgContenidos1
        : this.config.imgPathDevelopment.imgContenidos1;
    },

    setPathImgContenidos2() {
      return process.env.NODE_ENV === "production"
        ? this.config.imgPathProduction.imgContenidos2
        : this.config.imgPathDevelopment.imgContenidos2;
    }
  },

  created() {
    window.scrollTo(0, 0);
    this.getContent(this.dataContentDefault.link);
  },

  beforeUpdate(){
      this.getContent(this.dataContent.link);
  },

  methods: {
        getContent(path){
            Axios.get(path)
            .then(response => {
                let tempArray = [];
                this.currentDataContent = response.data.data;
                tempArray.push(this.currentDataContent);
                this.currentDataParsed = tempArray[0];
            })
            .catch(error => {
                console.log('error',error);
            });
        }
    }
};
</script>

