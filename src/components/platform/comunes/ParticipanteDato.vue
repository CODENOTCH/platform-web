    <template>
    <div class="card participant-data">
        <div class="card-header label-data">
            {{data.label}}
        </div>
        <div class="card-body content-data">
            <div v-if="!isContabilityData" class="common-data-container">
                <input v-if="isEditable" type="text" class="input-edit" v-model.trim="data.content">
                <h5 v-else class="card-title">{{data.content}}</h5>
            </div>
            <div v-else class="contability-data-container">
                <div v-if="confirmMode" class="container-alert">
                        <p>¿Desea modificar este dato?</p>
                        <div class="container-btn">
                            <button @click="confirmModalHandler" type="button" class="btn btn-success">
                                <v-icon>done</v-icon>
                            </button>
                            <button @click="closeModalHandler" type="button" class="btn btn-danger">
                                <v-icon>close</v-icon>
                            </button>
                        </div>
                    </div>
                <h5 v-if="defaultMode" class="card-title">{{data.content}}</h5>
                <input v-if="editMode" type="text" class="input-edit" v-model.trim="data.content">
                <div class="block-btns">
                    <v-btn v-if="editMode" 
                            @click="clickConfirmHandler"
                            dark
                            small
                            fab
                            class="btn-confirm"
                    >
                        <v-icon>done</v-icon>
                    </v-btn>
                    <v-btn v-if="defaultMode" 
                            @click="clickEditHandler"
                            dark
                            small
                            fab
                            class="btn-edit"
                    >
                        <v-icon>edit</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
    export default {
        name: 'participanteDato',

        props: ["data","type","defaultType"],

        data(){
            return{
                defaultMode: true,
                editMode: false,
                confirmMode: false
            }
        },

        computed: {
            isEditable(){
                return this.type === 'editable' ? true : false;
            },

            isContabilityData(){
                return this.defaultType === 'contabilidad' ? true : false;
            }
        },

        created(){
            //console.log('created ParticipanteDato defaultType',this.defaultType);
        },

        methods:{
            clickEditHandler(){
                this.confirmMode = false;
                this.defaultMode = false;
                this.editMode = true;
            },

            clickConfirmHandler(){
                this.confirmMode = true;
                this.defaultMode = false;
                this.editMode = true;
            },

            confirmModalHandler(){
                /* AQUI IRIA LA LLAMADA PUT */ 
                let type=""
                if (this.data.label=='datos de facturación - empresa') type="empresa"
                if (this.data.label=='datos de facturación - cif') type="cif"
                if (this.data.label=='datos de facturación - dirección') type="direccion"
                if (this.data.label=='forma de pago') type="pago"
                Axios.put('https://www.codenotch.com/students/updateFactdata',{
                    params: {
                       content: this.data.content,
                       type: type,
                       userid: this.$route.params.id 
                    }
                });

                console.log('data:',this.data.content)
                console.log('type:',this.data.label)
                console.log('userId:',this.$route.params.id)

                this.confirmMode = false;
                this.defaultMode = true;
                this.editMode = false;
            },

            closeModalHandler(){
                this.confirmMode = false;
                this.defaultMode = false;
                this.editMode = true;
            }
        }
    }
</script>
