<template>
    <transition name="contentTransition" appear>
        <div class="container-modal confirm">Modal
            <v-card class="block-modal">
                <v-card-text>¿Quieres confirmar los cambios?</v-card-text>
                <v-card-actions>
                    <div class="container-btn">
                        <button @click="confirmHandler" type="button" class="btn btn-success">
                            <v-icon>done</v-icon>
                        </button>
                        <button @click="restoreHandler" type="button" class="btn btn-danger">
                            <v-icon>close</v-icon>
                        </button>
                        <button @click="editHandler" type="button" class="btn btn-info">
                            <v-icon>edit</v-icon>
                        </button>
                    </div>
                </v-card-actions>
            </v-card>
        </div>
    </transition>
</template>

<script>
    export default {
        name:'participantesModal',

        created(){
        },

        destroy(){
        },

        methods: {
            confirmHandler(){
                this.$emit('onConfirmModal');
            },

            restoreHandler(){
                this.$emit('onRestoreModal');
            },

            editHandler(){
                this.$emit('onEditModal');
            }
        }
    }    
</script>
