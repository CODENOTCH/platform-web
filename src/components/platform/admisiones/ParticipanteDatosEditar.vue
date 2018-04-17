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
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-2 offset-xl-5 container-img-codenotch">
                    <img class="img-fluid img-codenotch" :src="photoPath" alt="foto alumno" />
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
                            <div class="container-links" v-for="(item,index) of currentParticipantData.links" :key="index">
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
                            @onConfirmModal="confirmModalHandler"
                            @onRestoreModal="restoreModalHandler"
                            @onEditModal="editModalHandler"
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
import ParticipantesModal from './ParticipantesModal.vue';

export default {
  name: 'participanteDatosEditar',

  components: {
      participanteDato: ParticipanteDato,
      participanteDatoLink: ParticipanteDatoLink,
      participanteDatoLinkEditar: ParticipanteDatoLinkEditar,
      participantesModal: ParticipantesModal
  },

  data() {
    return {
      currentBootcampData: [],
      currentParticipantData: {},
      defaultParticipantData: {},
      defaultParticipantDataLinks: [],
      currentFilteredData: {},
      //defaultFilteredData: {},
      bootcampId: '',
      id: '',
      participantType: '',
      photoPath: '',
      modeLink: 'normal',
      indexSelectedLink: 0,
      onModalMode: false
    };
  },

  computed: {
    ...mapGetters({
      config: 'getConfigData',
      bootcampData: 'getBootcampData',
      profile:'getProfile',
      editModeActive: 'getEditModeActive'
    }),

    isContabilityProfile(){
        return this.profile === 'contabilidad' ? true : false;
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

    this.currentBootcampData = arrBootcampsData[indexBootcampMatched];

    /* set current Participant and type of Participant */ 

    let participantsList = null;

    switch (this.$route.name) {
      case "alumnoDatosEditarAdmisiones":
        participantsList = arrBootcampsData[indexBootcampMatched].studentList;
        this.participantType = 'student';
        break;
      case "profesorDatosEditarAdmisiones":
        participantsList = arrBootcampsData[indexBootcampMatched].teacherList;
        this.participantType = 'teacher';
        break;
    }
    
    let indexParticipantsMatched = participantsList.findIndex(
      item => item._id === this.id
    );

    this.defaultParticipantData = participantsList[indexParticipantsMatched];
    this.defaultParticipantDataLinks = [...participantsList[indexParticipantsMatched].links];

    this.currentParticipantData = {...this.defaultParticipantData};

    /*this.defaultParticipantDataLinks = participantsList[indexParticipantsMatched].links.forEach( (item) => {
        console.log('item',item);
        item = {...item};
    });*/

    this.currentParticipantData.links = [...this.defaultParticipantDataLinks];

    /*this.currentParticipantData = {...this.defaultParticipantData};
    this.currentParticipantData.links = [...this.defaultParticipantDataLinks];
    this.currentParticipantData.links.forEach( (item) => {
        item = {...item};
    });*/

    console.log('defaultParticipantData from ParticipanteDatosEditar created',this.defaultParticipantData);
    console.log('defaultParticipantDataLinks from ParticipanteDatosEditar created',this.defaultParticipantDataLinks);

    //console.log('this.currentParticipantData', this.currentParticipantData);

     /* get filtered data by keys */ 

    if(this.participantType === 'student'){
        let studentData = participantsList[indexParticipantsMatched].data;
        let firstFilterKey = 'shared';
        let secondFilterKey = this.profile;
        let objFiltered = {};

        objFiltered = _.merge(_.pickBy(studentData, item => item.type === firstFilterKey),_.pickBy(studentData, item => item.type === secondFilterKey));

       /* this.defaultFilteredData = objFiltered;
        this.defaultFilteredData.telefono.content = '98899889';
        this.currentFilteredData = {...this.defaultFilteredData};*/

        this.currentFilteredData = objFiltered;
    } 

    else {
        /*this.defaultFilteredData = this.currentParticipantData.data;
        this.defaultFilteredData = {...this.currentParticipantData.data};
        this.currentFilteredData = {...this.defaultFilteredData};*/photoPath

         this.currentFilteredData = this.currentParticipantData.data;
    }

    this.photoPath = this.currentParticipantData.photoPath;
  },

  methods:{
      clickConfirmHandler(){
           //console.log('this.currentParticipantData after', this.currentParticipantData);

           this.onModalMode = true;
      },

      handleFile(e){
        const file = e.target.files[0];
        const formElement = document.getElementById("form-upload");
        const _data = new FormData(formElement);
        _data.append(file,file.name);

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        Axios.post('https://www.codenotch.com/docs/upload',_data,config)
        .then( (response) => {
            const responseData = response.data;
            //console.log('responseData',responseData);
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

      editLink(index){
        this.indexSelectedLink = index;  
        this.modeLink = 'edit';
      },

      deleteLink(index){
        this.currentParticipantData.links.splice(index,1);
      },

      confirmModalHandler(){
        this.onModalMode = false;
        this.$router.back();
      },

      restoreModalHandler(){
        this.currentParticipantData = {...this.defaultParticipantData};
        this.currentParticipantData.links = [...this.defaultParticipantDataLinks];
        //this.currentParticipantData.data = {...this.defaultFilteredData};
        this.photoPath = this.currentParticipantData.photoPath; 
        this.onModalMode = false;
        console.log('defaultParticipantDataLinks from ParticipanteDatosEditar restoreModalHandler',this.defaultParticipantDataLinks);
        console.log('defaultParticipantData from ParticipanteDatosEditar restoreModalHandler',this.defaultParticipantData);
        //console.log('defaultFilteredData from ParticipanteDatosEditar restoreModalHandler',this.defaultFilteredData);
      },

      editModalHandler(){
        this.onModalMode = false;
      },
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


