<template>
    <div class="programa-cabecera">
         <ul>
            <li v-for='(item,i) of listItemsCabecera' v-bind:key="i">
                <a :class={active:item.active} @click="clickHandler(i,item.name)">
                    <img v-if="item.name == 'menu'" :src="setPathIconIndice" alt="icono índice"/>
                    <img v-else-if="item.name == 'contenidos'" :src="setPathIconContenidos" alt="icono documento"/>
                    <img v-else-if="item.name == 'slides'" :src="setPathIconSlides" alt="icono slides"/>
                    <img v-else :src="setPathIconDesarrollos" alt="icono desarrollos"/>
                    <span>{{ item.name }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'programaCabecera',

        data () {
            return {
                listItemsCabecera:[
                    {name:'menu', active:false},
                    {name:'contenidos', active:true},
                    {name:'slides', active:false},
                    {name:'desarrollos', active:false}
                ]
            }
        },

        computed: {
            ...mapGetters({
                config: 'getConfigData'
            }),

            setPathIconIndice() {
                return process.env.NODE_ENV === 'production'
                    ? this.config.imgPathProduction.iconIndice
                    : this.config.imgPathDevelopment.iconIndice;
            },

            setPathIconContenidos() {
                return process.env.NODE_ENV === 'production'
                    ? this.config.imgPathProduction.iconContenidos
                    : this.config.imgPathDevelopment.iconContenidos;
            },

            setPathIconSlides() {
                return process.env.NODE_ENV === 'production'
                    ? this.config.imgPathProduction.iconSlides
                    : this.config.imgPathDevelopment.iconSlides;
            },

            setPathIconDesarrollos() {
                return process.env.NODE_ENV === 'production'
                    ? this.config.imgPathProduction.iconDesarrollos
                    : this.config.imgPathDevelopment.iconDesarrollos;
            }
        },    

        methods: {
            clickHandler(index,tabName){
                let isIndexOpen = false;

                if(tabName === 'menu') isIndexOpen = !isIndexOpen;

                this.$emit('clickedTab',tabName,isIndexOpen);

                this.setTab(index);
            },
            
            setTab(index){
                let listItemsCabeceraTemp = [...this.listItemsCabecera];

                for(let item of listItemsCabeceraTemp){
                    item.active = false;
                }

                let itemCabeceraTemp = {...listItemsCabeceraTemp[index]};
                itemCabeceraTemp.active = true;

                listItemsCabeceraTemp[index] = itemCabeceraTemp;

                this.listItemsCabecera = listItemsCabeceraTemp;
            }
        }
    }
</script>