<template>
    <div v-if="isVisible" class="container-link">
        <v-chip>
            {{data.content}}
            <v-icon class="icon" @click="clickEditHandler">edit</v-icon>
            <v-icon class="icon" @click="clickDeleteHandler">delete</v-icon>
        </v-chip>
    </div>
</template>

<script>
    export default {
        name: 'ParticipanteDatoLink',

        props: ["data","index","mode"],

        computed: {
            isVisible(){
                return this.mode === "normal" ? true : false;
            }
        },

        methods:{
            clickEditHandler(){
                this.$emit('onClickBtnEditLink',this.index);
            },

            clickDeleteHandler(){
                this.$emit('onClickBtnDeleteLink',this.index);
            }
        }
    }
</script>