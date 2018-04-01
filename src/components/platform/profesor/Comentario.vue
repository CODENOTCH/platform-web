<template>
    <div class="comment">
        <comentario-header :title="weekTitle"
                            :acceptMode="acceptMode"
                            :confirmMode="confirmMode"
                            :editMode="editMode"
                            @onClickAccept="alertHandler"
                            @onClickEdit="editBtnHandler"
        ></comentario-header>
        <comentario-box :comment="getComment"
                        :editMode="editMode"
                        :confirmMode="confirmMode"
                        @onBoxHandler="onBoxHandler"
                        @onConfirm="confirmHandler"
                        @onEdit="editBoxBtnHandler"
                        ref="boxwrapper"
        ></comentario-box>
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

        props:['weekTitle','weekComment','indexSelected'],

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

            getComment(){
                let comment = this.weekComment ? this.weekComment : '';
                return comment;
            }
        },

        created(){
             if(this.weekComment) this.editMode = true;
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

            editBoxBtnHandler(comment){
                this.acceptMode =  comment ? true : false;
                this.confirmMode = false;
                this.editMode = false;

                this.$refs.boxwrapper.setBoxFocus();
            },

            editBtnHandler(){
                this.acceptMode = true;
                this.confirmMode = false;
                this.editMode = false;

                this.$refs.boxwrapper.setBoxFocus();
            }
        }
    }    
</script>
