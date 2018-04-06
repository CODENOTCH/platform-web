<template>
    <div class="comment-header">
        <h4>{{ title }}</h4>
        <div class="block-btns">
            <!--img v-if="acceptMode" 
                :src="getPathIconConfirm" 
                alt="icono editar" 
                @click="clickAcceptHandler"
            />
            <img v-if="editMode"
                :src="getPathIconEdit"
                alt="icono confirmar"
                @click="clickEditHandler"
            /-->
            <!--button v-if="acceptMode" 
                    @click="clickAcceptHandler"
                    type="button" 
                    class="btn-success"
            >   
                <v-icon>done</v-icon>
            </button-->
            <v-btn v-if="acceptMode" 
                    @click="clickAcceptHandler"
                    dark
                    small
                    fab
                    class="btn-comment"
            >
                <v-icon>done</v-icon>
            </v-btn>
            <!--button v-if="editMode"
                    @click="clickEditHandler"
                    type="button" 
                    class="btn-info"
            >   
                <v-icon>edit</v-icon>
            </button-->
            <v-btn v-if="editMode" 
                    @click="clickEditHandler"
                    dark
                    small
                    fab
                    class="btn-comment"
            >
                <v-icon>edit</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name:'comentarioHeader',

        props:['title','acceptMode','editMode'],

        computed: {
            ...mapGetters({
                config: "getConfigData",
            }),

            getPathIconEdit() {
                return process.env.NODE_ENV === "production"
                    ? this.config.imgPathProduction.iconEdit
                    : this.config.imgPathDevelopment.iconEdit;
            },

            getPathIconConfirm() {
                return process.env.NODE_ENV === "production"
                    ? this.config.imgPathProduction.iconConfirm
                    : this.config.imgPathDevelopment.iconConfirm;
            }
        },

        methods:{
            clickAcceptHandler(){
                this.$emit('onClickAccept');
            },

            clickEditHandler(){
                this.$emit('onClickEdit');
            }
        }
    }    
</script>
