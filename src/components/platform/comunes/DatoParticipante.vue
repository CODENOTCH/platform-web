<template>
    <div class="card participant-data">
        <div class="card-header label-data">
            {{data.label}}
        </div>
        <div class="card-body content-data">
            <h5 class="card-title">{{data.content}}</h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'datoParticipante',

        props: ["data"],
    }
</script>