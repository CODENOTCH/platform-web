<template>
    <div class="comment-box">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex>
                    <v-text-field box multi-line label="Comentarios" 
                        @click="boxHandler" 
                        @keyup="boxHandler" 
                        v-model.trim="comment"
                        :class="{ confirmed: editMode }"
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

        props:['editMode'],

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
        &.confirmed {
            .input-group__input {
                background: $darkWhite;
                pointer-events: none;
            }
        }    
    }

    .input-group--focused.primary--text {
        color: $purple;
    }

    .input-group label {
        color: $grey;
    }
</style>  
