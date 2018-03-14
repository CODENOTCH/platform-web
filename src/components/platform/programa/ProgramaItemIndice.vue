<template>
    <div :class="classSelected" @click="clickItemIndexHandler(id)">
        <slot name="icon"></slot>
        <slot name="text"></slot>
    </div>
</template>

<script>

    export default {
        name: 'programaItemIndice',
        props: ['type','id'],

        data () {
            return {
                classSelected: this.type == 'tema' ? 'modulo-tema' : 'modulo-subtema'
            }
        },

        methods: {
            clickItemIndexHandler(i){
                this.$emit('clickedItemIndexHandler',i);
            }
        }
    }
</script>