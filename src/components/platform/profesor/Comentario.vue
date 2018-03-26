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
                editMode: false
            }
        },

        computed: {
            ...mapGetters({
                isProgram: 'getIsProgram',
            }),
        },

        methods:{
            sendComment(e,comment,confirmed) {
                //console.log(confirmed);

                this.confirmMode = false;
                this.editMode = true;

                console.log("comment:", comment);
            },

            onBoxHandler(isEmpty){
                this.confirmMode = isEmpty ? false : true;
            },

            confirmHandler(){
                this.confirmMode = false;
                this.editMode = true;
            },

            editHandler(){
                this.confirmMode = true;
                this.editMode = false;
            }
        }
    }    
</script>
