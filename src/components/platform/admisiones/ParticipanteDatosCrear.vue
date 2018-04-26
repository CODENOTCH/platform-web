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
                    <img class="img-fluid img-codenotch" :src="getPhotoPath" alt="foto alumno" />
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
                    <input type="text" class="input-edit" v-model.trim="dataSelected.name">
                </div> 
            </div>
            <div class="row">
                <div class="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-6 offset-xl-3 container-data-participant">
                    <div class="card participant-data container-description">
                        <div class="card-header label-data">DESCRIPCIÓN</div>
                        <div class="card-body content-data">
                            <textarea class="textarea-edit" v-model.trim="dataSelected.description"></textarea>
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
                                    <div class="container-link" v-for="(item,index) of dataSelected.links" :key="index">
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
                            @onRejectModal="rejectModalHandler"
                            @onConfirmModal="confirmModalHandler"
                            @onCloseModal="closeModalHandler"
        ></participantes-modal>
    </div> 
</template>

<script>
import Axios from 'axios';
import _ from 'lodash';
import { EventBus } from '../../../containers/eventBus.js';
import { mapGetters } from 'vuex';
import ParticipanteDato from '../comunes/ParticipanteDato.vue';
import ParticipanteDatoLink from './ParticipanteDatoLink.vue';
import ParticipanteDatoLinkEditar from './ParticipanteDatoLinkEditar.vue';
import ParticipanteDatoLinkNuevo from './ParticipanteDatoLinkNuevo.vue';
import ParticipantesModal from './ParticipantesModal.vue';

export default {
  name: 'participanteDatosCrear',

  components: {
      participanteDato: ParticipanteDato,
      participanteDatoLink: ParticipanteDatoLink,
      participanteDatoLinkEditar: ParticipanteDatoLinkEditar,
      participanteDatoLinkNuevo: ParticipanteDatoLinkNuevo,
      participantesModal: ParticipantesModal
  },

  data() {
    return {
      dataSelected: {},
      currentFilteredData: {},
      id: '',
      participantType: '',
      photoPath: '',
      modalType: "",
      modeLink: 'normal',
      indexSelectedLink: 0,
      onModalMode: false
    };
  },

  computed: {
    ...mapGetters({
      config: 'getConfigData',
      profile:'getProfile',
    }),

    getPhotoPath() {
      if(!this.photoPath){
        return process.env.NODE_ENV === 'production'
            ? this.config.imgPathProduction.imgAnonimo
            : this.config.imgPathDevelopment.imgAnonimo;
      }
      else return this.photoPath;  
    },

    isVisibleBtnAddLink(){
        return this.modeLink === "normal" ? true : false;
    }
  },

  beforeCreate(){
    this.$store.commit('setIsBootcamp',true);
  },

  created() {
    window.scrollTo(0, 0);

    /* set current Data and type of Participant */ 

    switch (this.$route.name) {
      case "alumnoDatosCrearAdmisiones":
        this.participantType = 'student';
        this.dataSelected = _.cloneDeep(this.config.dataNewStudent);
        break;
      case "profesorDatosCrearAdmisiones":
        this.participantType = 'teacher';
        this.dataSelected = _.cloneDeep(this.config.dataNewTeacher);
        break;
    }

     /* get filtered data by keys */ 

    if(this.participantType === 'student'){
        let studentData = this.dataSelected.data;
        let firstFilterKey = 'shared';
        let secondFilterKey = this.profile;
        let objFiltered = {};

        objFiltered = _.merge(_.pickBy(studentData, item => item.type === firstFilterKey),_.pickBy(studentData, item => item.type === secondFilterKey));

        this.currentFilteredData = objFiltered;
        console.log(this.currentFilteredData.domicilio.content);
    } 

    else this.currentFilteredData = this.dataSelected.data;

    this.modalType = "confirm";
  },

  methods:{
      clickConfirmHandler(){
        if(this.dataSelected.photoPath === "undefined") this.modalType = 'reject';
        this.onModalMode = true;
      },

      rejectModalHandler(){
        this.onModalMode = false;
      },

      confirmModalHandler(){
        EventBus.$emit('onConfirmNewUser',this.dataSelected);

        let userType = this.participantType === 'student' ? 'alumno' : 'profesor';

        Axios.post('https://www.codenotch.com/users/register',{
            params: {
                username: this.dataSelected.name,
                password: this.currentFilteredData.dni.content,
                usertype: userType,
                mail: this.currentFilteredData.email.content
            }    
        })
        .then( (response) => {
            let dataUser = response.data;

            if(dataUser.type === 'alumno'){
                //console.log('por alumno', this.currentFilteredData.codigoPostal.content);
                Axios.post('https://www.codenotch.com/students/insertStudent',{
                    params: {
                        DNI: this.currentFilteredData.dni.content,
                        address: this.currentFilteredData.domicilio.content,
                        phone: this.currentFilteredData.telefono.content,
                        description: this.dataSelected.description,
                        photo: this.dataSelected.photoPath,
                        birthdate: this.currentFilteredData.fechaNacimiento.content,
                        bornplace: this.currentFilteredData.lugarNacimiento.content,
                        sex: this.currentFilteredData.sexo.content,
                        postalcode: this.currentFilteredData.codigoPostal.content,
                        nationality: this.currentFilteredData.nacionalidad.content,
                        coursetype: this.currentFilteredData.modalidadCurso.content,
                        studies: this.currentFilteredData.estudios.content,
                        workexp: this.currentFilteredData.experienciaLaboral.content,
                        meetus: this.currentFilteredData.referenciasCodenotch.content,
                        interestedon: this.currentFilteredData.interesCodenotch.content,
                        mainobjectives: this.currentFilteredData.objetivosProgramación.content,
                        adminotes: this.currentFilteredData.notasAdmisiones.content,
                        civilstatus: this.currentFilteredData.estadoCivil.content,
                        hobbies: this.currentFilteredData.hobbies.content,
                        themesofinterest: this.currentFilteredData.temasInteres.content,
                        visitedcompanies: this.currentFilteredData.empresas.content,
                        jobprofile: this.currentFilteredData.perfilCandidato.content,
                        paymethod: this.config.dataNewStudent.data.formaPago.content,
                        factname: this.config.dataNewStudent.data.facturacionEmpresa.content,
                        cif: this.config.dataNewStudent.data.facturacionCib.content,
                        factadress: this.config.dataNewStudent.data.facturacionDireccion.content,
                        bootcampid: this.dataSelected.content,
                        userid: dataUser._id
                    }    
                })
                .then( (response) => {
                    console.log(response);
                })
                .catch( (error) => {
                    console.log(error);
                });
            } else {
                Axios.post('https://www.codenotch.com/teachers/insertTeacher',{
                    params: {
                        DNI: this.currentFilteredData.dni.content,
                        address: this.currentFilteredData.domicilio.content,
                        phone: this.currentFilteredData.telefono.content,
                        description: this.dataSelected.description,
                        postalcode: this.currentFilteredData.codigoPostal.content,
                        photo: this.dataSelected.photoPath,
                        birthdate: this.currentFilteredData.fechaNacimiento.content,
                        bootcampid: this.dataSelected.bootcampId,
                        userid: dataUser._id
                    }    
                })
                .then( (response) => {
                    console.log(response);
                })
                .catch( (error) => {
                    console.log(error);
                });
            }
        })
        .catch( (error) => {
            console.log(error);
        });


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
            this.dataSelected.photoPath = this.photoPath;
            this.modalType = "confirm";
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

        this.dataSelected.links.push(newLink);
        
        this.modeLink = 'normal';
      },

      deleteLink(index){
        this.dataSelected.links.splice(index,1);
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


