<template>
        <div class="container-modal confirm">
            <v-card class="block-modal">
                <div class="select-modal">
                    <v-card-text>{{getMessage}}</v-card-text>
                    <v-card-actions>
                        <div v-if="type !== 'reject'" class="container-btn">
                            <button @click="confirmHandler" type="button" class="btn btn-success">
                                <v-icon>done</v-icon>
                            </button>
                            <button @click="closeHandler" type="button" class="btn btn-danger">
                                <v-icon>close</v-icon>
                            </button>
                        </div>
                        <div v-else class="container-btn">
                             <button @click="rejectHandler" type="button" class="btn btn-warning">
                                <v-icon>warning</v-icon>
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
                let message = '';

                switch (this.type) {
                    case 'return':
                        message = '¿Quieres salir del modo edición?';
                    break;
                    case 'confirm':
                        message = '¿Quieres confirmar los cambios?';
                    break;
                    case 'delete':
                        message = '¿Quieres eliminar a este usuario?';
                    break;
                    case 'reject':
                        message = 'Para crear un nuevo usuario, debes subir una foto desde tu ordenador';
                    break;
                }

                return message;
            }
        },

        methods: {
            confirmRejectHandler(){
                this.$emit('onConfirmRejectParticipantModal');
            },

            confirmHandler(){
                switch (this.type) {
                    case 'return':
                        this.$emit('onReturnModal');
                    break;
                    case 'delete':
                        this.$emit('onConfirmDeleteModal');
                    break;
                    case 'confirm':
                        this.$emit('onConfirmModal');
                    break;
                }
            },

            closeHandler(){
                switch (this.type) {
                    case 'return':
                    case 'delete':
                    case 'confirm':
                        this.$emit('onCloseModal');
                    break;
                }
            },

            rejectHandler(){
                this.$emit('onRejectModal')
            }
        }
    }    
</script>
