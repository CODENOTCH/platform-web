<template>
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
                                                    required
                                    ></v-text-field>
                                </div>
                                <div class="col-12">
                                    <v-text-field   label="Contraseña"
                                                    v-model.trim="password"
                                                    @keyup.enter="submit"
                                                    :rules="passwordRules"
                                                    class="input-login"
                                                    required
                                    ></v-text-field>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
                                    <v-btn class="btn-codenotch" @click="submit">INICIAR SESIÓN</v-btn>
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
        }),

        computed: {
            ...mapGetters({
                config: 'getConfigData',
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

                    /*let myRandom = Math.round(Math.random() * 3) + 0;

                    [   {profile:'alumno', path:'/alumno'},
                        {profile:'profesor', path:'/profesor'},
                        {profile:'admisiones' , path:'/admisiones/bootcamps'},
                        {profile:'contabilidad' , path:'/contabilidad/bootcamps'}
                    ].forEach((item,index) => {
                        if(index === myRandom){
                            console.log('item.profile',item.profile);
                            console.log('item.path',item.path);
                            this.$store.commit('setProfile', item.profile);
                            this.$router.push({path: item.path});
                        }
                    });*/

                    /* TEMPORAL */

                    if(this.user === 'alumno' && this.password === 'alumno') {
                        this.$store.commit('setProfile', 'alumno');
                        this.$router.push({path: '/alumno'});
                    }

                    if(this.user === 'profesor' && this.password === 'profesor') {
                        this.$store.commit('setProfile', 'profesor');
                        this.$router.push({path: '/profesor'});
                    }

                    if(this.user === 'admisiones' && this.password === 'admisiones') {
                        this.$store.commit('setProfile', 'admisiones');
                        this.$router.push({path: '/admisiones/bootcamps'});
                    }

                    if(this.user === 'contabilidad' && this.password === 'contabilidad') {
                        this.$store.commit('setProfile', 'contabilidad');
                        this.$router.push({path: '/contabilidad/bootcamps'});
                    }

                    
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
            }
        }
    }
</script>

<style lang='stylus'>
  @import '../../../stylus/main'

    .input-group__details:before {
        background: $grey
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
        color: $purple
    }

    .input-group--error.error--text{
        color: $red
    }
</style>

