<template>
    <div class="card participant-data">
        <div class="card-header label-data">
            {{data.label}}
        </div>
        <div class="card-body content-data">
            <input v-if="isEditable" type="text" class="input-edit" v-model.trim="data.content">
            <h5 v-else class="card-title">{{data.content}}</h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'participanteDato',

        props: ["data","type"],

        computed: {
            isEditable(){
                return this.type === 'editable' ? true : false;
            }
        }
    }
</script>