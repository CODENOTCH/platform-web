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
            <login-modal v-if="onModalMode" @onClickCloseModal="onClickBtnModal"></login-modal>
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

                    /* TEMPORAL */ 

                    /*Axios.post('/api/submit', {
                        name: this.name,
                        email: this.email
                    });*/

                    /* TEMPORAL */ 

                    let arrayFakeResponse = [
                        {
                            name:"Laura",
                            id:"1.112347",
                            profile:"alumno", 
                            user:"alumno", 
                            password:"alumno",
                            route:'alumno',
                            bootcampId:'1.1'
                        },
                        {
                            name:"Alberto",
                            id:"1.112352",
                            profile:"profesor", 
                            user:"profesor", 
                            password:"profesor",
                            route: 'profesor',
                            bootcampId:'1.1'
                        },
                        {
                            name:"Paloma",
                            id:"1.4",
                            profile:"admisiones", 
                            user:"admisiones", 
                            password:"admisiones",
                            route: 'admisiones/bootcamps',
                            bootcampId:'1.1'
                        },
                        {
                            name:"Manuel",
                            id:"1.5",
                            profile:"contabilidad", 
                            user:"contabilidad", 
                            password:"contabilidad",
                            route: 'contabilidad/bootcamps',
                            bootcampId:'1.1'
                        }
                    ]

                    let filteredArray = arrayFakeResponse.filter( (userCodenotch,indexArray) => {
                        if( this.user !== userCodenotch.user ) {
                            this.onModalMode = true;
                            return;
                        }
                        else if(this.password !== userCodenotch.password) return;
                        else{
                            this.$store.commit('setProfile', userCodenotch.profile);
                            this.$store.commit('setUserId', userCodenotch.id);
                            this.$store.commit('setBootcampId', userCodenotch.bootcampId);
                            this.$router.push({path: `/${userCodenotch.route}`});
                        }
                    } );
                    
                    /* TEMPORAL */ 

                    //this.$store.commit('setProfile', 'alumno');
                    //this.$store.commit('setProfile', 'profesor');
                    //this.$store.commit('setProfile', 'admisiones');
                    //this.$store.commit('setProfile', 'contabilidad');
                    //this.$store.commit('setBootcampId', '1.1');
                    //this.$store.commit('setStudentId', '1.1');

                    //this.$router.push({path:'/alumno'});
                    //this.$router.push({path:'/profesor'});
                    //this.$router.push({path:'/admisiones/bootcamps'});
                    //this.$router.push({path:'/contabilidad/bootcamps'});
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

