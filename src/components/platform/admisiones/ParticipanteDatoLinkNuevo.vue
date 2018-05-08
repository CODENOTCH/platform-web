<template>
    <div class="container-link-add">
        <div class="container-inputs">
             <input type="text" maxlength="12" class="input-edit" v-model.trim="label">
             <input type="text" class="input-edit" v-model.trim="link">
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
        name: 'ParticipanteDatoLinkNuevo',

        props: ["index","indexSelected","mode"],

        data() {
            return {
                label:'ejemplo',
                link:'www.ejemplo.com'
            };
        },

        methods:{
            clickConfirmHandler(){
                this.$emit('onClickBtnConfirmNewLink',this.label,this.link);
            }
        }
    }
</script>