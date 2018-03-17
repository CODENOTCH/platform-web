<template>
    <transition name="contentTransition" appear>
        <div class="programa">
            <ProgramaIndice @clickedItemIndex="onClickItemIndex" :dataIndex="program.indice" :isIndexOpen="isIndexOpen"></ProgramaIndice>
            <ProgramaCabecera @clickedTab="onClickProgramCabeceraTab"></ProgramaCabecera>
            <ProgramaCore ref="coreProgram"></ProgramaCore>
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
            ProgramaIndice: ProgramaIndice,
            ProgramaCabecera: ProgramaCabecera,
            ProgramaCore: ProgramaCore
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
            onClickProgramCabeceraTab(numSectionActive,isIndexOpen){
                this.isIndexOpen = isIndexOpen;
                this.$refs.coreProgram.goSectionActive(numSectionActive);
            },
            onClickItemIndex(id){
                this.$refs.coreProgram.updateContent(id);
            }
        }
    }
</script>

