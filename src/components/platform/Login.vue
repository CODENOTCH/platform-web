<template>
    <div id="login">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="logo-container">
                        <h1>
                            <img :src="setPathLogo" alt="logo Codenotch">
                        </h1>
                    </div>
                </div>
                <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <div class="form-container">
                        <v-form class="container" v-model="valid" ref="form" lazy-validation>
                            <div class="row">
                                <div class="col-12">
                                    <v-text-field   label="Nombre"
                                                    v-model="name"
                                                    :rules="nameRules"
                                                    required
                                    ></v-text-field>
                                </div>
                                <div class="col-12">
                                    <v-text-field   label="Email"
                                                    v-model="email"
                                                    :rules="emailRules"
                                                    required
                                    ></v-text-field>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
                                    <v-btn class="btn-codenotch" @click="submit">SIGN IN</v-btn>
                                </div>
                            </div>
                        </v-form> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';
    import { mapGetters } from 'vuex';

    export default {
        name:'login',
        
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Necesitamos tu nombre',
                v => (v && v.length <= 25) || 'El nombre no puede tener más de 25 caracteres'
            ],
            email: '',
            emailRules: [
                v => !!v || 'Necesitamos tu email',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Debe ser un formato de email válido'
            ],
        }),

        computed: {
            ...mapGetters({
                config: 'getConfigData',
            }),
            setPathLogo: function() {
                return process.env.NODE_ENV === 'production' ? this.config.imgPathProduction.logo : this.config.imgPathDevelopment.logo
            }
        },

        methods: {
            submit () {
                if (this.$refs.form.validate()) {
                    /*Axios.post('/api/submit', {
                        name: this.name,
                        email: this.email
                    });*/
                }
            }
        }
    }
</script>

<style lang="stylus">
  @import '../../stylus/main'

  .input-group__details:before {
        background: $grey
   }

   .input-group--text-field input, .input-group--text-field textarea {
        font-size: 1.3em
    }

    .input-group label {
        font-size: 1.3em
    }

    .input-group--focused.primary--text{
        color: $purple
    }

    .input-group--error.error--text{
        color: $red
    }
</style>

