<template>
    <div class="programa-indice" :class="[{active:isIndexOpen},{visible:isVisible}]">
        <div class="logo-container">
            <router-link :to="{ name: getLinkLogo}">
              <h1>
                  <img :src="getPathLogo" alt="logo Codenotch"/>
              </h1>
            </router-link>  
        </div>
        <div class="indice-container">
            <ul>
                <li v-for="(moduleItem,moduleIndex) of moduleList" v-bind:key="moduleIndex">
                    <div class="modulo-container">
                        <div class="modulo-cabecera">
                            <span>Módulo {{ moduleItem.id }}</span>
                        </div>
                        <div class="modulo-temas-container">
                            <ul>
                                <li v-for='(item,i) of currentDataIndex' v-bind:key="i">
                                    <item-indice :active="item.active" 
                                                  :type="item.type"
                                                  :id="item.id"
                                                  @clickedItem="onClickItem">
                                        <img v-if="item.type == 'tema'"
                                              slot="icon" 
                                              :src="getPathIconTema" 
                                              alt="icono documento"/>
                                        <img v-else
                                             slot="icon" 
                                             :src="getPathIconSubtema" 
                                             alt="icono documento"/>
                                        <span slot="text">{{item.text}}</span>
                                    </item-indice>
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
    itemIndice: ProgramaItemIndice
  },

  props: ['isIndexOpen'],

  data() {
    return {
      currentDataIndex: [],
      moduleData: [],
      moduleList: [
        { name: 'frontend', id: 1 },
        { name: 'backend', id: 2 },
        { name: 'mobile', id: 3 }
      ],
      isVisible: false
    };
  },

  computed: {
    ...mapGetters({
      config: 'getConfigData',
      profile: 'getProfile',
      program: 'getProgramData'
    }),

    getPathLogo() {
      return process.env.NODE_ENV === 'production'
        ? this.config.imgPathProduction.logo
        : this.config.imgPathDevelopment.logo;
    },

    getPathIconTema() {
      return process.env.NODE_ENV === 'production'
        ? this.config.imgPathProduction.iconTema
        : this.config.imgPathDevelopment.iconTema;
    },

    getPathIconSubtema() {
      return process.env.NODE_ENV === 'production'
        ? this.config.imgPathProduction.iconSubtema
        : this.config.imgPathDevelopment.iconSubtema;
    },

    getLinkLogo(){
      let route = this.profile === 'alumno' ? 'alumnoIntro' : 'profesorIntro';
      return route;
    }
  },

  created() {
    Axios.get(this.program.indice.path)
      .then(response => {
        for (let module in response.data) this.moduleData.push(response.data[module]) 
        let modules = this.moduleData.reduce( (prev,next) => prev.concat(next));
        this.currentDataIndex = modules;
      })
      .catch(error => {
        console.log(error);
      });
  },

  mounted(){
    this.isVisible = true;
  },

  methods: {
    onClickItem(id){
      this.$emit('clickedItemIndex',id);
      this.setItemActive(id);
    },

    setItemActive(id){
      let listItems = [...this.currentDataIndex];
      
      let index = listItems.findIndex(item => item.id === id);

      for(let item of listItems) item.active = false;

      let itemSelected = {...listItems[index]};
      itemSelected.active = true;

      listItems[index] = itemSelected;

      this.currentDataIndex = listItems;
    }
  }
};
</script>