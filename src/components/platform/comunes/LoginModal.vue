<template>
  <v-layout row justify-center class="container-modal">
    <v-dialog v-model="modalMode" persistent max-width="500" class="block-modal">
      <v-card>
        <v-card-title class="headline">Ups! ha habido un error</v-card-title>
        <v-card-text>Su usuario no está registrado en la plataforma. Por favor, contacte con el Teacher Asistant</v-card-text>
        <v-card-actions>
          <v-btn class="btn-codenotch" @click="closeModalHandler()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
    export default {
        name:'loginModal',
        props: ["modalMode"],
        methods: {
            closeModalHandler(){
                this.$emit('onClickCloseModal');
            }
        }
    }    
</script>
