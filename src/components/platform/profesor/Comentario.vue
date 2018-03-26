<template>
    <div class="comment">
        <comentario-header :title="itemSelected"
                            :confirmMode="confirmMode"
                            :editMode="editMode"
                            @onClickConfirm="confirmHandler"
                            @onClickEdit="editHandler"
        ></comentario-header>
        <comentario-box @onBoxHandler="onBoxHandler"
                        :editMode="editMode"
        >
        </comentario-box>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ComentarioHeader from './ComentarioHeader.vue';
    import ComentarioBox from './ComentarioBox.vue';

    export default {
        name:'comentario',

        components: {
            comentarioHeader: ComentarioHeader,
            comentarioBox: ComentarioBox,
        },

        props:['itemSelected','indexSelected'],

        data(){
            return{
                confirmMode: false,
                editMode: false,
                comment:''
            }
        },

        computed: {
            ...mapGetters({
                isProgram: 'getIsProgram',
            }),
        },

        methods:{
            onBoxHandler(comment,isEmpty){
                this.confirmMode = isEmpty ? false : true;
                if(!isEmpty) this.comment = comment;
            },

            confirmHandler(){
                this.confirmMode = false;
                this.editMode = true;

                this.$emit('onConfirmComment', this.comment, this.indexSelected);
            },

            editHandler(){
                this.confirmMode = true;
                this.editMode = false;
            }
        }
    }    
</script>
