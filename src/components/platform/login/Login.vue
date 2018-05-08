<template>
    <transition name="contentTransition" appear>
        <div id="login">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="logo-container">
                            <h1>
                                <img :src="getPathLogo" alt="logo Codenotch"/>
                            </h1>
                        </div>
                    </div>
                    <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                        <div class="form-container">
                            <v-form class="container" v-model="valid" ref="form" lazy-validation>
                                <div class="row">
                                    <div class="col-12">
                                        <v-text-field   label="Usuario"
                                                        v-model.trim="user"
                                                        @keyup.enter="submit"
                                                        :rules="userRules"
                                                        class="input-login"
                                                        autofocus
                                                        counter
                                                        required
                                        ></v-text-field>
                                    </div>
                                    <div class="col-12">
                                        <v-text-field   label="Contraseña"
                                                        v-model.trim="password"
                                                        @keyup.enter="submit"
                                                        :rules="passwordRules"
                                                        class="input-login"
                                                        :append-icon="e2 ? 'visibility' : 'visibility_off'"
                                                        :append-icon-cb="() => (e2 = !e2)"
                                                        :type="e2 ? 'password' : 'text'"
                                                        required
                                        ></v-text-field>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
                                        <v-btn class="btn-codenotch" @click="submit" slot="activator">INICIAR SESIÓN</v-btn>
                                    </div>
                                </div>
                            </v-form> 
                        </div>
                    </div>
                </div>
            </div>
            <login-modal v-if="onModalMode" :type="typeModal" @onClickCloseModal="onClickBtnModal"></login-modal>
        </div>
    </transition>
</template>

<script>
    import Axios from 'axios';
    import { mapGetters } from 'vuex';
    import LoginModal from './LoginModal.vue';

    export default {
        name:'login',

        components: {
            loginModal: LoginModal
        },
        
        data: () => ({
            valid: true,
            user: '',
            userRules: [
                v => !!v || 'Necesitamos tu usuario',
                v => (v && v.length <= 25) || 'El nombre de usuario no puede tener más de 25 caracteres'
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Necesitamos tu contraseña',
                v => (v && v.length <= 25) || 'La contraseña no puede tener más de 25 caracteres'
            ],
            onModalMode: false,
            typeModal: '',
            e2: true
        }),

        computed: {
            ...mapGetters({
                config: 'getConfigData'
            }),
            
            getPathLogo: function() {
                return process.env.NODE_ENV === 'production' ? this.config.imgPathProduction.logo : this.config.imgPathDevelopment.logo
            }
        },

        methods: {
            submit () {
                if (this.$refs.form.validate()) {

                    /* SENDING POST PARAMS */

                   Axios.post('https://www.codenotch.com/users/login',{
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            "Access-Control-Allow-Origin": "*"
                        },
                        params: {
                            username: this.user,
                            password: this.password
                        }
                    })
                    .then( (response) => {
                        const responseData = response.data;
                        //console.log(responseData.type);

                        if(responseData.message === 'unauthorized') {
                            this.typeModal = "wrongUser";
                            this.onModalMode = true;
                            return;
                        }

                        this.$store.commit('setLogged', true);
                        this.$store.commit('setProfile', responseData.type);
                        this.$store.commit('setUserId', responseData._id);

                        switch (responseData.type) {
                            case "alumno":
                                this.$router.push({path:'alumno'});
                                this.$store.commit('setBootcampId', response.data.bootcampId);
                                break;
                            case "profesor":
                                this.$router.push({path:'profesor'});
                                this.$store.commit('setBootcampId', response.data.bootcampId);
                                break;
                            case "admisiones":
                                this.$router.push({path:'admisiones/bootcamps'});
                                this.$store.commit('setBootcampId', response.data.bootcampId);
                                break;    
                            case "contabilidad":
                                this.$router.push({path:'contabilidad/bootcamps'});
                                this.$store.commit('setBootcampId', response.data.bootcampId);
                                break; 
                        }
                    })
                    .catch( (error) => {
                        console.log(error);
                    });
                }
            },

            onClickBtnModal(){
                this.onModalMode = false;
            }
        }
    }
</script>

<style lang='stylus'>
  @import '../../../stylus/main'

    .input-group__details:before {
        background: $purple
    }

    .input-group--text-field input, .input-group--text-field textarea {
        font-size: 1.3em
    }

    form .input-group .input-group__input {
        background: transparent;
    }

    .input-group label {
        font-size: 1.3em
    }

    .input-group--focused.primary--text{
        color: $grey
    }

    .input-group--error.error--text{
        color: $red
    }
</style>

