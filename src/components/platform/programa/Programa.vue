<template>
    <transition name="contentTransition" appear>
        <div class="programa">
            <programa-indice @clickedItemIndex="onClickItemIndex" :dataIndex="program.indice" :isIndexOpen="isIndexOpen"></programa-indice>
            <programa-cabecera ref="header" @clickedTab="onClickProgramCabeceraTab"></programa-cabecera>
            <programa-core ref="core"></programa-core>
        </div>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex';

    import ProgramaIndice from './ProgramaIndice.vue';
    import ProgramaCabecera from './ProgramaCabecera.vue';
    import ProgramaCore from './ProgramaCore.vue';

    export default {
        name:'programa',

        components: {
            programaIndice: ProgramaIndice,
            programaCabecera: ProgramaCabecera,
            programaCore: ProgramaCore
        },

        data () {
            return {
                isIndexOpen: false
            }
        },

        computed: {
            ...mapGetters({
                config: 'getConfigData',
                program: 'getProgramData'
            })
        },

        beforeCreate(){
            this.$store.commit('setIsProgram',true);
        },

        methods: {
            onClickProgramCabeceraTab(nameTab,isIndexOpen){
                this.isIndexOpen = isIndexOpen;
                this.$refs.core.goSectionActive(nameTab);
            },
            
            onClickItemIndex(id){
                if(this.isIndexOpen){
                    this.isIndexOpen = !this.isIndexOpen;
                    this.$refs.header.setTab(1);
                    this.$refs.core.goSectionActive('contenidos');
                }
                this.$refs.core.updateContent(id);
            }
        }
    }
</script>

