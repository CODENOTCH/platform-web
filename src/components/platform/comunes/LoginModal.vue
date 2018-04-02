<template>
  <div class="container-modal">
      <v-card class="block-modal">
        <v-card-title class="headline">Ups! ha habido un error</v-card-title>
        <v-card-text>Su usuario no está registrado en la plataforma. Por favor, contacte con el Teacher Asistant</v-card-text>
        <v-card-actions>
          <v-btn class="btn-codenotch" 
                    @click="closeModalHandler"
                    @keyup.enter="closeModalHandler"
                    > OK
            </v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
    export default {
        name:'loginModal',
        methods: {
            closeModalHandler(){
                this.$emit('onClickCloseModal');
            }
        }
    }    
</script>
