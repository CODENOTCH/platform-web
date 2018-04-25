<template>
    <div class="programa-contenidos">
        <!--div v-if="isLoading" class="container-progress">
            <v-progress-circular indeterminate :size="70" :width="7" color="purple"></v-progress-circular>
        </div-->
        <div class="container-fluid">
            <div class="row">
                <div class="container-data col-12 col-sm-10 offset-sm-1">
                    <data-contenido v-for='(item,i) of currentData' :key="i">
                        <h2 slot="title" v-if="item.type === 'title'">{{item.content}}</h2>
                        <h3 slot="subtitle" v-if="item.type === 'subtitle'">{{item.content}}</h3>
                        <img slot="img" v-if="item.type === 'img'" :src="item.content" alt="imagen contenido"/>
                        <p slot="text" v-if="item.type === 'text'" v-html="item.content"></p>
                        <p slot="list" v-if="item.type === 'list'" class="list-content" v-html="item.content"></p>
                        <a :href="item.content" slot="link" v-if="item.type === 'link'" class="link-codenotch" v-html="item.content"></a>
                    </data-contenido>
                </div>
            </div>
        </div>
    </div>      
</template>

<script>
import ProgramaDataContenido from './ProgramaDataContenido.vue';

export default {
  name: "programaContenidos",

  components: {
    dataContenido: ProgramaDataContenido
  },

  props: ["currentData"],

  data () {
        return {
            //isLoading: true
        }
    },

  created() {
    window.scrollTo(0, 0);
  },

  beforeUpdate(){
        window.scrollTo(0, 0);
    },

  mounted(){
      //this.isLoading = false;
  }  


};
</script>

