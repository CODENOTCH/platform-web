<template>
    <div class="programa-contenidos">
        <div class="container-fluid">
            <div class="row">
                <div class="container-data col-12 col-sm-10 offset-sm-1">
                    <ProgramaDataContenido v-for='(item,i) of currentDataParsed' :key="i">
                        <h2 slot="title" v-if="item.type === 'title'" :key="i">{{item.content}}</h2>
                        <h3 slot="subtitle" v-if="item.type === 'subtitle'" :key="i">{{item.content}}</h3>
                        <img slot="img" v-if="item.type === 'img'" :src="item.content" alt="imagen contenido" :key="i"/>
                        <p slot="text" v-if="item.type === 'text'" v-html="item.content" :key="i"></p>
                        <p slot="list" v-if="item.type === 'list'" class="list-content" v-html="item.content" :key="i"></p>
                    </ProgramaDataContenido>
                </div>
            </div>
        </div>
    </div>      
</template>

<script>
import Axios from "axios";
import { mapGetters } from "vuex";

import ProgramaDataContenido from './ProgramaDataContenido.vue';

export default {
  name: "programaContenidos",

  components: {
    ProgramaDataContenido: ProgramaDataContenido
  },

  props: ["dataContentDefault","firstTime"],

  data() {
    return {
        containerData:null,
        currentDataContent: {},
        currentDataParsed: []
    };
  },

  computed: {
    ...mapGetters({
      config: "getConfigData"
    })
  },

  created() {
    window.scrollTo(0, 0);
    this.getContent(this.dataContentDefault.link);
    //console.log('dataContent',this.dataContent);
  },

  mounted(){
      this.containerData = document.querySelector('.container-data');
      console.log('containerData',this.containerData);
  },

  /*beforeMount(){
      console.log(' programaContenidos beforeMount');
  },

  mounted(){
      console.log(' programaContenidos mounted');
  },*/

  beforeUpdate(){
      /*console.log(' programaContenidos beforeUpdate');
      if(!this.firstTime) {
          console.log('add fade-out');
          this.containerData.classList.add("fade-out");
      }*/
  },

  updated(){
      /*console.log(' programaContenidos updated');
      if(!this.firstTime) {
           console.log('remove fade-out');
           setTimeout(() => {
               this.containerData.classList.remove("fade-out");
           }, 1000);
      }*/
  },

  beforeDestroy(){
      console.log('programaContenidos beforeDestroy');
  },

  methods: {
        getContent(path){
            //console.log(path)
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

