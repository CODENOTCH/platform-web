<template>
    <div class="card dato-alumno">
        <div class="card-header dato-label">
            {{data.label}}
        </div>
        <div class="card-body dato-content">
            <h5 class="card-title">{{data.content}}</h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dataAlumno',

        props: ["data"],
    }
</script>