<template>
    <div class="comment-box">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex>
                    <div v-if="confirmMode" class="container-alert">
                        <p>¿Desea confirmar el comentario?</p>
                        <div class="container-btn">
                            <button @click="confirmHandler" type="button" class="btn btn-success">sí</button>
                            <button @click="rejectHandler" type="button" class="btn btn-danger">no</button>
                        </div>
                    </div>
                    <v-text-field box multi-line label="Comentarios" 
                        @click="boxHandler" 
                        @keyup="boxHandler" 
                        v-model.trim="comment"
                        :class="{ editmode: editMode, confirmmode: confirmMode}"
                        autofocus
                        loading
                        hint="Añada sus comentarios"
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

        props:['editMode','confirmMode'],

        computed: {
            ...mapGetters({
                isProgram: 'getIsProgram',
            }),
        },

        data(){
            return{
                comment:'',
                isEmpty: true
            }
        },

        methods:{
            boxHandler(){
                this.isEmpty = this.comment ? false : true;
                this.$emit('onBoxHandler',this.comment,this.isEmpty);
            },

            confirmHandler(){
                this.$emit('onClickConfirm');
            },

            rejectHandler(){
                this.$emit('onClickEdit');
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
                /*color: $softGrey;*/
                color: $purple;
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
