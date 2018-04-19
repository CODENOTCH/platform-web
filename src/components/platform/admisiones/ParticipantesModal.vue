<template>
        <div class="container-modal confirm">
            <v-card class="block-modal">
                <div v-if="type === 'reject'" class="reject-modal">
                    <v-card-text>Para crear un nuevo usuario, debes subir una foto desde tu ordenador</v-card-text>
                        <v-card-actions>
                            <div class="container-btn">
                                <button @click="confirmRejectHandler" type="button" class="btn btn-warning">
                                    <v-icon>warning</v-icon>
                                </button>
                            </div>
                    </v-card-actions>
                </div>
                <div v-else class="select-modal">
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
                </div>
            </v-card>
        </div>
</template>

<script>
    export default {
        name:'participantesModal',

        props: ["type"],

        computed: {
            getMessage(){
                let message = this.type === 'confirm' ? '¿Quieres confirmar los cambios?' : '¿Quieres eliminar a este usuario?';
                return message;
            }
        },

        methods: {
            confirmRejectHandler(){
                this.$emit('onConfirmRejectParticipantModal');
            },

            confirmHandler(){
                this.type === 'confirm' ? this.$emit('onConfirmModal') : this.$emit('onConfirmDeleteParticipantModal');
            },

            restoreHandler(){
                this.$emit('onRestoreModal');
            }
        }
    }    
</script>
