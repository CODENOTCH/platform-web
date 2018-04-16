<template>
    <div v-if="isVisible" class="container-link-edit">
        <div class="container-inputs">
             <input type="text" class="input-edit" v-model.trim="data.content">
             <input type="text" class="input-edit" v-model.trim="data.url">
        </div>
        <div class="container-btn">
            <v-btn
                dark
                small
                fab
                @click="clickConfirmHandler"
                class="btn"
                >
                <v-icon>done</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ParticipanteDatoLinkEditar',

        props: ["data","index","indexSelected","mode"],

        computed: {
            isVisible(){
                return this.mode === "edit" && this.indexSelected === this.index ? true : false;
            }
        },

        methods:{
            clickConfirmHandler(){
                this.$emit('onClickBtnConfirmLink');
            }
        }
    }
</script>