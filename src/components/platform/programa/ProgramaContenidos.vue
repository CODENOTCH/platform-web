<template>
    <div class="programa-contenidos">
        <div class="container-fluid">
            <div class="row">
                <div class="container-data col-12 col-sm-10 offset-sm-1">
                    <data-contenido v-for='(item,i) of currentData' :key="i">
                        <h2 slot="title" v-if="item.type === 'title'" :key="i">{{item.content}}</h2>
                        <h3 slot="subtitle" v-if="item.type === 'subtitle'" :key="i">{{item.content}}</h3>
                        <img slot="img" v-if="item.type === 'img'" :src="item.content" alt="imagen contenido" :key="i"/>
                        <p slot="text" v-if="item.type === 'text'" v-html="item.content" :key="i"></p>
                        <p slot="list" v-if="item.type === 'list'" class="list-content" v-html="item.content" :key="i"></p>
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

  created() {
    window.scrollTo(0, 0);
  }
};
</script>

