<template>
    <div class="comment-header">
        <h4>{{ title }}</h4>
        <div class="block-icons">
            <img v-if="confirmMode" 
                :src="setPathIconConfirm" 
                alt="icono editar" 
                @click="clickConfirmHandler"
            />
            <img v-if="editMode"
                :src="setPathIconEdit"
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

        props:['title','confirmMode','editMode'],
        
        data(){
            return{
                activeConfirmMode: false,
                activeEditMode: true
            }
        },

        computed: {
            ...mapGetters({
                config: "getConfigData",
            }),

            setPathIconEdit() {
                return process.env.NODE_ENV === "production"
                    ? this.config.imgPathProduction.iconEdit
                    : this.config.imgPathDevelopment.iconEdit;
            },

            setPathIconConfirm() {
                return process.env.NODE_ENV === "production"
                    ? this.config.imgPathProduction.iconConfirm
                    : this.config.imgPathDevelopment.iconConfirm;
            }
        },

        methods:{
            clickConfirmHandler(){
                this.$emit('onClickConfirm');
            },

            clickEditHandler(){
                this.$emit('onClickEdit');
            }
        }
    }    
</script>
