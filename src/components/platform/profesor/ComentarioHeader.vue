<template>
    <div class="comment-header">
        <h4>{{ title }}</h4>
        <div class="block-icons">
            <img v-if="acceptMode" 
                :src="getPathIconConfirm" 
                alt="icono editar" 
                @click="clickAcceptHandler"
            />
            <img v-if="editMode"
                :src="getPathIconEdit"
                alt="icono confirmar"
                @click="clickEditHandler"
            />
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
