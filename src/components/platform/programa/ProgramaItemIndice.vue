<template>
    <div :class="[classSelected,activeSelected]" @click="clickItemHandler(id)">
        <slot name="icon"></slot>
        <slot name="text"></slot>
    </div>
</template>

<script>

    export default {
        name: 'programaItemIndice',
        props: ['type','id','active'],

        data () {
            return {
                classSelected: this.type == 'tema' ? 'modulo-tema' : 'modulo-subtema',
                activeSelected: this.active ? 'active' : null
            }
        },

        methods: {
            clickItemHandler(i){
                this.$emit('clickedItem',i);
            }
        }
    }
</script>