<template>
        <div class="container-modal confirm">
            <v-card class="block-modal">
                <v-card-text>{{getMessage}}</v-card-text>
                <v-card-actions>
                    <div class="container-btn">
                        <button @click="confirmHandler" type="button" class="btn btn-success">
                            <v-icon>done</v-icon>
                        </button>
                        <button @click="restoreHandler" type="button" class="btn btn-danger">
                            <v-icon>close</v-icon>
                        </button>
                    </div>
                </v-card-actions>
            </v-card>
        </div>
</template>

<script>
    export default {
        name:'participantesModal',

        props: ["type"],

        computed: {
            getMessage(){
                let message = this.type === 'confirm' ? '¿Quieres confirmar los cambios?' : '¿Seguro que desea eliminar a este usuario?';
                return message;
            }
        },

        methods: {
            confirmHandler(){
                this.type === 'confirm' ? this.$emit('onConfirmModal') : this.$emit('onConfirmDeleteParticipantModal');
            },

            restoreHandler(){
                this.$emit('onRestoreModal');
            }
        }
    }    
</script>
