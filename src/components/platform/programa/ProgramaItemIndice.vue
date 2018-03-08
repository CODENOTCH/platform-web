<template>
    <div :class="classSelected">
        <slot name="icon"></slot>
        <slot name="text"></slot>
    </div>
</template>

<script>

    export default {
        name: 'programaItemIndice',
        props: ['type'],

        data () {
            return {
                classSelected: this.type == 'tema' ? 'modulo-tema' : 'modulo-subtema'
            }
        }
    }
</script>