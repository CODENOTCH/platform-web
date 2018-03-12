<template>
    <div class="programa-indice" :class="{active:isIndexOpen}">
        <div class="logo-container">
            <h1>
                <img :src="setPathLogo" alt="logo Codenotch"/>
            </h1>
        </div>
        <div class="indice-container">
            <ul>
                <li v-for="(moduleItem,i) of moduleList" v-bind:key="i">
                    <div class="modulo-container">
                        <div class="modulo-cabecera">
                            <span>Módulo {{ moduleItem.id }}</span>
                        </div>
                        <div class="modulo-temas-container">
                            <ul>
                                <li v-for='(item,i) of indexDataModules[i]' v-bind:key="i">
                                    <ProgramaItemIndice :type="item.type">
                                        <img v-if="item.type == 'tema'" slot="icon" :src="setPathIconTema" alt="icono documento"/>
                                        <img v-else slot="icon" :src="setPathIconSubtema" alt="icono documento"/>
                                        <span slot="text">{{item.text}}</span>
                                    </ProgramaItemIndice>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import { mapGetters } from 'vuex';
import ProgramaItemIndice from './ProgramaItemIndice.vue';

export default {
  name: 'programaIndice',

  components: {
    ProgramaItemIndice: ProgramaItemIndice
  },

  props: ['isIndexOpen'],

  data() {
    return {
      indexData: {},
      indexDataModules: [],
      moduleList: [
        { name: 'frontend', id: 1 },
        { name: 'backend', id: 2 },
        { name: 'mobile', id: 3 }
      ]
    };
  },

  computed: {
    ...mapGetters({
      config: 'getConfigData'
      //isOpen: 'getStateIndexProgram'
    }),

    setPathLogo() {
      return process.env.NODE_ENV === 'production'
        ? this.config.imgPathProduction.logo
        : this.config.imgPathDevelopment.logo;
    },

    setPathIconTema() {
      return process.env.NODE_ENV === 'production'
        ? this.config.imgPathProduction.iconTema
        : this.config.imgPathDevelopment.iconTema;
    },

    setPathIconSubtema() {
      return process.env.NODE_ENV === 'production'
        ? this.config.imgPathProduction.iconSubtema
        : this.config.imgPathDevelopment.iconSubtema;
    }
  },

  beforeCreate() {
    const indexPath =
      process.env.NODE_ENV === 'production'
        ? './assets/data/indexProgram.json'
        : './public/assets/data/indexProgram.json';

    Axios.get(indexPath)
      .then(response => {
        this.indexData = response.data;

        this.indexDataModules.push(this.indexData.module1);
        this.indexDataModules.push(this.indexData.module2);
        this.indexDataModules.push(this.indexData.module3);

        this.setIndexProgramData();
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    setIndexProgramData() {
      this.$store.commit('setIndexProgramData', this.indexData);
    }
  }
};
</script>