<template>
    <div id="login">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="logo-container">
                        <h1>
                            <img :src="config.imgPath.logo" alt="">
                        </h1>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-container">
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-text-field    label="Name"
                                            v-model="name"
                                            :rules="nameRules"
                                            required
                            ></v-text-field>
                            <v-text-field   label="E-mail"
                                            v-model="email"
                                            :rules="emailRules"
                                            required
                            ></v-text-field>
                            <v-btn @click="submit">submit</v-btn>
                            <v-btn @click="clear">clear</v-btn>
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
        computed: mapGetters({
            config: 'getConfigData'
        }),
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
        }),
        methods: {
            submit () {
                if (this.$refs.form.validate()) {
                Axios.post('/api/submit', {
                    name: this.name,
                    email: this.email
                })
                }
            },
            clear () {
                this.$refs.form.reset()
            }
        }
    }
</script>

<style lang="stylus">
  @import '../stylus/main'

  .input-group__details:before {
      background: $grey
   }
</style>

