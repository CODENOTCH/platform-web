<template>
    <transition name="contentTransition" appear>
        <div class="programa">
            <programa-indice @clickedItemIndex="onClickItemIndex" :dataIndex="program.indice" :isIndexOpen="isIndexOpen"></programa-indice>
            <programa-cabecera @clickedTab="onClickProgramCabeceraTab"></programa-cabecera>
            <programa-core ref="coreProgram"></programa-core>
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

        methods: {
            onClickProgramCabeceraTab(nameTab,isIndexOpen){
                this.isIndexOpen = isIndexOpen;
                this.$refs.coreProgram.goSectionActive(nameTab);
            },
            onClickItemIndex(id){
                this.$refs.coreProgram.updateContent(id);
            }
        }
    }
</script>

