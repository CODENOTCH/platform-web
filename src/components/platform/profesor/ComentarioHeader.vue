<template>
    <div class="comment-header">
        <h4>{{ title }}</h4>
        <div class="block-btns">
            <v-btn v-if="acceptMode" 
                    @click="clickAcceptHandler"
                    dark
                    small
                    fab
                    class="btn-comment"
            >
                <v-icon>done</v-icon>
            </v-btn>
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
