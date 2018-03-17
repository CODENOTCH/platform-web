<template>
    <div class="programa-contenidos">
        <div class="container-fluid">
            <div class="row">
                <div class="container-data col-12 col-sm-10 offset-sm-1">
                    <ProgramaDataContenido v-for='(item,i) of currentContentsData' :key="i">
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
import { mapGetters } from "vuex";
import ProgramaDataContenido from './ProgramaDataContenido.vue';

export default {
  name: "programaContenidos",

  components: {
    ProgramaDataContenido: ProgramaDataContenido
  },

  props: ["currentContentsData"],

  data() {
    return {
        containerData:null,
        currentDataContent: {},
        currentData: []
    };
  },

  computed: {
    ...mapGetters({
      config: "getConfigData"
    })
  },

  created() {
    window.scrollTo(0, 0);
    //this.currentData = [...this.currentDataParsed];
   // this.getContent(this.dataContentDefault.contenidosPath);
    //console.log('dataContent',this.dataContent);
  },

  
};
</script>

