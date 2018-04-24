<template>
    <div class="interior-ficha edit">
        <div class="container-btn-confirm">
            <v-btn
                dark
                small
                fab
                @click="clickConfirmHandler"
                class="btn"
                >
                <v-icon>done</v-icon>
            </v-btn>
        </div>
        <div class="container-btn-delete">
            <v-btn
                dark
                small
                fab
                @click="clickDeleteHandler"
                class="btn"
                >
                <v-icon>delete_forever</v-icon>
            </v-btn>
        </div>  
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-2 offset-xl-5 container-img-codenotch">
                    <img class="img-fluid img-codenotch" :src="photoPath" alt="foto alumno" />
                    <div ref="loading" class="loading-codenotch">
                         <v-progress-circular indeterminate :width="7" class="progress-codenotch"></v-progress-circular>
                    </div>
                    <label class="btn-codenotch">
                        SUBIR FOTO 
                        <form enctype="multipart/form-data" method="post" id="form-upload">
                            <input name="filetoupload" type="file" hidden accept="image/*" @change="handleFile">
                        </form>
                    </label>
                </div> 
            </div>
            <div class="row">
                <div class="col-12 container-name">
                    <input type="text" class="input-edit" v-model.trim="currentParticipantData.name">
                </div> 
            </div>
            <div class="row">
                <div class="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-6 offset-xl-3 container-data-participant">
                    <div class="card participant-data container-description">
                        <div class="card-header label-data">DESCRIPCIÓN</div>
                        <div class="card-body content-data">
                            <textarea class="textarea-edit" v-model.trim="currentParticipantData.description"></textarea>
                        </div>
                    </div>
                    <div class="card participant-data container-links">
                        <div class="card-header label-data">LINKS</div>
                        <div class="card-body content-data">
                            <div class="wrapper-links">
                                <div class="container-links">
                                    <participante-dato-link-nuevo v-if="modeLink === 'add'" 
                                                            @onClickBtnConfirmNewLink="confirmNewLink"
                                                            >
                                    </participante-dato-link-nuevo>
                                    <div class="container-link" v-for="(item,index) of currentParticipantData.links" :key="index">
                                        <participante-dato-link-editar 
                                                            :data="item"
                                                            :index="index"
                                                            :indexSelected="indexSelectedLink"
                                                            :mode="modeLink"
                                                            @onClickBtnConfirmLink="confirmLink"
                                                            >
                                        </participante-dato-link-editar>
                                        <participante-dato-link :data="item"
                                                                :index="index"
                                                                :mode="modeLink"
                                                                @onClickBtnEditLink="editLink"
                                                                @onClickBtnDeleteLink="deleteLink"
                                                                >
                                        </participante-dato-link>
                                    </div>
                                </div>
                                <div v-if="isVisibleBtnAddLink" class="container-btn-add">
                                    <v-btn
                                        dark
                                        small
                                        fab
                                        class="btn"
                                        @click="addLink"
                                        >
                                        <v-icon>add</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <participante-dato v-for="(item,index) of currentFilteredData" 
                                        :key="index" 
                                        :data="item" 
                                        :type="'editable'">
                    </participante-dato>
                </div> 
            </div>
        </div>
        <participantes-modal v-if="onModalMode"
                            :type="modalType"
                            @onConfirmModal="confirmModalHandler"
                            @onCloseModal="closeModalHandler"
                            @onConfirmDeleteModal="confirmDeleteModalHandler"
        ></participantes-modal>
    </div> 
</template>

<script>
import Axios from 'axios';
import _ from 'lodash';
import { mapGetters } from 'vuex';
import ParticipanteDato from '../comunes/ParticipanteDato.vue';
import ParticipanteDatoLink from './ParticipanteDatoLink.vue';
import ParticipanteDatoLinkEditar from './ParticipanteDatoLinkEditar.vue';
import ParticipanteDatoLinkNuevo from './ParticipanteDatoLinkNuevo.vue';
import ParticipantesModal from './ParticipantesModal.vue';

export default {
  name: 'participanteDatosEditar',

  components: {
      participanteDato: ParticipanteDato,
      participanteDatoLink: ParticipanteDatoLink,
      participanteDatoLinkEditar: ParticipanteDatoLinkEditar,
      participanteDatoLinkNuevo: ParticipanteDatoLinkNuevo,
      participantesModal: ParticipantesModal
  },

  data() {
    return {
      currentParticipantData: {},
      currentFilteredData: {},
      bootcampId: '',
      id: '',
      participantType: '',
      participantList: null,
      photoPath: '',
      modeLink: 'normal',
      indexSelectedLink: 0,
      onModalMode: false,
      modalType: ""
    };
  },

  computed: {
    ...mapGetters({
      bootcampData: 'getBootcampData',
      profile:'getProfile'
    }),

    isVisibleBtnAddLink(){
        return this.modeLink === "normal" ? true : false;
    }
  },

  beforeCreate(){
    this.$store.commit('setIsBootcamp',true);
  },

  created() {
    window.scrollTo(0, 0);

    /* set current Bootcamp */ 

    this.bootcampId = this.$route.params.bootcampId;
    this.id = this.$route.params.id;

    let arrBootcampsData = [...this.bootcampData.bootcamps];
    let indexBootcampMatched = arrBootcampsData.findIndex(
      item => item._id === this.bootcampId
    );

    /* set current Participant and type of Participant */ 

    switch (this.$route.name) {
      case "alumnoDatosEditarAdmisiones":
        this.participantsList = arrBootcampsData[indexBootcampMatched].studentList;
        this.participantType = 'student';
        break;
      case "profesorDatosEditarAdmisiones":
        this.participantsList = arrBootcampsData[indexBootcampMatched].teacherList;
        this.participantType = 'teacher';
        break;
    }
    
    let indexParticipantsMatched = this.participantsList.findIndex(
      item => item._id === this.id
    );

    this.currentParticipantData = this.participantsList[indexParticipantsMatched];

     /* get filtered data by keys */ 

    if(this.participantType === 'student'){
        let studentData = this.participantsList[indexParticipantsMatched].data;
        let firstFilterKey = 'shared';
        let secondFilterKey = this.profile;
        let objFiltered = {};

        objFiltered = _.merge(_.pickBy(studentData, item => item.type === firstFilterKey),_.pickBy(studentData, item => item.type === secondFilterKey));

        this.currentFilteredData = objFiltered;
    } 

    else this.currentFilteredData = this.currentParticipantData.data;

    this.photoPath = this.currentParticipantData.photoPath;
  },

  methods:{
      clickConfirmHandler(){
          this.modalType = "confirm";
          this.onModalMode = true;
      },

      clickDeleteHandler(){
          this.modalType = "delete";
          this.onModalMode = true;
      },

      confirmDeleteModalHandler(){

          /* AXIOS DELETE */  

        Axios.delete('https://www.codenotch.com/students/deleteStudent',{
            data:{
                userid: this.currentParticipantData._id
            }
        }).then( (response) => {
            console.log(response);
        })
        .catch( (error) => {
            console.log(error);
        });

        this.onModalMode = false;
        
        let indexParticipantMatched = this.participantsList.findIndex(
            item => item === this.currentParticipantData
        );

        this.participantsList.splice(indexParticipantMatched,1);
        this.$router.back();
      },

      confirmModalHandler(){

        /* AÑADIR ENVIO POST */  

        this.onModalMode = false;
        this.$router.back();
      },

      closeModalHandler(){
        this.onModalMode = false;
      },

      handleFile(e){
        const file = e.target.files[0];
        const formElement = document.getElementById("form-upload");
        const _data = new FormData(formElement);
        _data.append(file,file.name);

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress:  (progressEvent) => {
                this.$refs.loading.classList.add('visible');
            }
        }

        Axios.post('https://www.codenotch.com/docs/upload',_data,config)
        .then( (response) => {
            this.$refs.loading.classList.remove('visible');

            const responseData = response.data;

            this.photoPath = responseData.secure_url;
            this.currentParticipantData.photoPath = this.photoPath;
        })
        .catch( (error) => {
            console.log(error);
        });
      },

      confirmLink(){
        this.modeLink = 'normal';
      },

      addLink(){
        this.modeLink = 'add';
      },

      editLink(index){
        this.indexSelectedLink = index;  
        this.modeLink = 'edit';
      },

      confirmNewLink(label,link){
        let newLink = {
            content: label,
            url: link,
        };

        this.currentParticipantData.links.push(newLink);
        
        this.modeLink = 'normal';
      },

      deleteLink(index){
        this.currentParticipantData.links.splice(index,1);
      }
  }
};
</script>

<style lang='stylus'>
  @import '../../../stylus/main'

    .chip {
        .chip__content{
            background: $softGrey
        }
    }
</style>


