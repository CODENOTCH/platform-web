<template>
  <div class="container-modal" @keyup.enter="closeModalHandler">
      <v-card class="block-modal">
        <v-card-title class="headline">Ups! ha habido un error</v-card-title>
        <v-card-text>{{ getTxtModal }}</v-card-text>
        <v-card-actions>
          <v-btn class="btn-codenotch" 
                    @click="closeModalHandler"
                    > OK
            </v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
    export default {
        name:'loginModal',

        props: ['type'],

        computed: {
            getTxtModal(){
                let txt = this.type === "wrongUser"
                            ? "Su usuario no está registrado en la plataforma. Por favor, contacte con el Teacher Asistant"
                            : "La contraseña es incorrecta"

                return txt;
            }
        },

        created(){
            document.addEventListener('keyup', this.setKeyupHandler);
        },

        destroy(){
            document.removeEventListener('keyup', this.setKeyupHandler);
        },

        methods: {
            closeModalHandler(){
                this.$emit('onClickCloseModal');
            },

            setKeyupHandler(e){
                if (e.keyCode == 13) this.$emit('onClickCloseModal');
            }
        }
    }    
</script>
