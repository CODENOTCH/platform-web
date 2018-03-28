<template>
    <div class="comment">
        <comentario-header :title="itemSelected"
                            :acceptMode="acceptMode"
                            :confirmMode="confirmMode"
                            :editMode="editMode"
                            @onClickAccept="alertHandler"
                            @onClickEdit="editHandler"
        ></comentario-header>
        <comentario-box @onBoxHandler="onBoxHandler"
                        @onClickConfirm="confirmHandler"
                        @onClickEdit="editHandler"
                        :editMode="editMode"
                        :confirmMode="confirmMode"
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
                acceptMode: false,
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
                this.acceptMode = isEmpty ? false : true;
                if(!isEmpty) this.comment = comment;
            },

            alertHandler(){
                this.acceptMode = false;
                this.confirmMode = true;
                this.editMode = false;
            },

            confirmHandler(){
                this.$emit('onConfirmComment', this.comment, this.indexSelected);

                this.acceptMode = false;
                this.confirmMode = false;
                this.editMode = true;
            },

            editHandler(){
                this.acceptMode = true;
                this.confirmMode = false;
                this.editMode = false;
            }
        }
    }    
</script>
