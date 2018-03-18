<template>
    <div>
        <slot name="container"></slot>
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
        <slot name="img"></slot>
        <slot name="text"></slot>
        <slot name="list"></slot>
    </div>    
</template>

<script>
    export default {
        name: 'programaDataContenido'
    }
</script>