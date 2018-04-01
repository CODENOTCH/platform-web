<template>
    <div class="comment-box">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex>
                    <div v-if="confirmMode" class="container-alert">
                        <p>¿Desea confirmar el comentario?</p>
                        <div class="container-btn">
                            <button @click="confirmHandler" type="button" class="btn btn-success">sí</button>
                            <button @click="restoreHandler" type="button" class="btn btn-danger">no</button>
                            <button @click="editHandler" type="button" class="btn btn-info">
                                <v-icon>edit</v-icon>
                            </button>
                        </div>
                    </div>
                    <v-text-field box multi-line label="Comentarios" 
                        @click="boxHandler" 
                        @keyup="boxHandler" 
                        v-model.trim="currentComment"
                        :class="{ editmode: editMode, confirmmode: confirmMode}"
                        loading
                        hint="Añada sus comentarios"
                        class="box-container"
                    >
                    </v-text-field>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name:'comentarioBox',

        props:['editMode','confirmMode','comment'],

        computed: {
            ...mapGetters({
                isProgram: 'getIsProgram',
            })
        },

        data(){
            return{
                currentComment:'',
                isEmpty: true
            }
        },

        created(){
            this.setInitialComment();
        },

        methods:{
            boxHandler(){
                this.isEmpty = this.currentComment ? false : true;
                this.$emit('onBoxHandler',this.currentComment,this.isEmpty);
            },

            confirmHandler(){
                this.$emit('onConfirm');
            },

            editHandler(){
                this.$emit('onEdit',this.currentComment);
            },

            restoreHandler(){
                if(this.comment){
                    this.currentComment = this.comment;
                    this.$emit('onConfirm');
                } else {
                    this.currentComment = '';
                    this.$emit('onEdit',this.currentComment);
                }
            },

            setInitialComment(){
                this.currentComment = this.comment ? this.comment : '';
            },

            setBoxFocus(){
                let boxWrapper = this.$el.querySelector('.box-container');
                let boxTextarea = boxWrapper.querySelector('textarea');

                boxTextarea.focus();
            }
        }
    }    
</script>

<style lang='stylus'>
    @import '../../../stylus/main';
    @import '../../../stylus/vars';

    .input-group{
        .input-group__input {
            background: $white;
        }
        &.confirmmode {
            .input-group__input {
                background: $darkWhite;
                pointer-events: none;
                textarea{
                    color: $grey;
                    opacity:.5;
                }
            }
        }
        &.editmode {
            label{
                color: $softGrey;
                /*color: $purple;*/
            }
            .input-group__input {
                background: $grey;
                pointer-events: none;
                textarea{
                    color: $darkWhite;
                }
            }
        }
    }

    .input-group--focused.primary--text {
        color: $purple;
    }

    .input-group label {
        color: $grey;
    }

    .input-group__details{
        color: $darkGrey;
        font-weight: 600;
    }
</style>  
