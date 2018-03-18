<template>
    <div :class="[getClassSelected,toogleClassActive]" @click="clickItemHandler(id)">
        <slot name="icon"></slot>
        <slot name="text"></slot>
    </div>
</template>

<script>

    export default {
        name: 'programaItemIndice',
        props: ['type','id','active'],

        computed:{
            getClassSelected(){
                let classSelected = this.type == 'tema' ? 'modulo-tema' : 'modulo-subtema';
                return classSelected;
            },

            toogleClassActive(){
                let activated = this.active ? 'active' : null
                return activated;
            }
        },

        methods: {
            clickItemHandler(i){
                this.$emit('clickedItem',i);
            }
        }
    }
</script>