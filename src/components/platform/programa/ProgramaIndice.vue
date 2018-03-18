<template>
    <div class="programa-indice" :class="{active:isIndexOpen}">
        <div class="logo-container">
            <router-link :to="{ name: 'alumnoHome'}">
              <h1>
                  <img :src="setPathLogo" alt="logo Codenotch"/>
              </h1>
            </router-link>  
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
                                <li v-for='(item,i) of currentDataIndex' v-bind:key="i">
                                    <item-indice :active="item.active" :type="item.type" :id="item.id" @clickedItem="onClickItem">
                                        <img v-if="item.type == 'tema'" slot="icon" :src="setPathIconTema" alt="icono documento"/>
                                        <img v-else slot="icon" :src="setPathIconSubtema" alt="icono documento"/>
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

  props: ['dataIndex','isIndexOpen'],

  data() {
    return {
      currentDataIndex: [],
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

  created() {
    Axios.get(this.dataIndex.link)
      .then(response => {
        this.currentDataIndex = response.data.module1.concat(response.data.module2,response.data.module3);
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    onClickItem(id){
      this.$emit('clickedItemIndex',id);
      this.setItemActive(id);
    },

    setItemActive(id){
      let listItems = [...this.currentDataIndex];
      let index = listItems.findIndex(item => item.id === id);

      for(let item of listItems){
          item.active = false;
      }

      let itemSelected = {...listItems[index]};
      itemSelected.active = true;

      //console.log(itemSelected)
      //console.log(listItems)

      listItems[index] = itemSelected;

      this.currentDataIndex = listItems;
    }
  }
};
</script>