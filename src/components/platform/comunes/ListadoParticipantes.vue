<template>
    <div id="listado-participantes" class="home participants">
        <div class="container-btns" v-if="isAdmissionProfile">
            <v-btn
                v-if="!editMode"
                dark
                small
                fab
                @click="clickEditHandler"
                class="btn-edit"
                >
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn
                v-else
                dark
                small
                fab
                @click="clickConfirmHandler"
                class="btn-confirm"
                >
                <v-icon>done</v-icon>
            </v-btn>
        </div>  
        <div class="container-fluid">
            <div class="row" >
                <div class="col-12 col-sm-10 offset-sm-1 col-md-6 offset-md-0 col-xl-4 offset-xl-0 block-participant" v-for="(item,index) of currentParticipantData" v-bind:key="index">
                    <div class="container-img">
                        <img class="img-fluid img-codenotch" :src="item.photoPath" alt="foto participante" />
                    </div> 
                    <div class="container-data">
                        <h2>{{item.name}}</h2>
                        <div class="block-data">
                            <div class="data">
                                <span class="label">DNI:</span>
                                <span class="value">{{item.data.dni.content}}</span>
                            </div>
                            <div class="data">
                                <span class="label">DOMICILIO:</span>
                                <span class="value">{{item.data.domicilio.content}}</span>
                            </div>
                            <div class="data">
                                <span class="label">EMAIL:</span>
                                <span class="value">{{item.data.email.content}}</span>
                            </div>
                            <div class="data">
                                <span class="label">TELÉFONO:</span>
                                <span class="value">{{item.data.telefono.content}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="btn-container col-xl-8 offset-xl-2">
                        <router-link v-if="!editMode" :to="{ path: `${currentRoute}/${item._id}`}">
                            <v-btn class="btn-codenotch">{{getNameBtn}}</v-btn>
                        </router-link>
                        <div v-else class="container-btns-edit">
                            <button @click="deleteParticipantHandler(item)" type="button" class="btn btn-danger">
                                <v-icon>delete</v-icon>
                            </button>
                            <router-link :to="{ path: `${currentRoute}/${item._id}/edit`}">
                                <button type="button" class="btn btn-info">
                                    <v-icon>edit</v-icon>
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
        <div class="container-btn-add" v-if="editMode">
            <v-btn
                dark
                small
                fab
                @click="clickEditHandler"
                class="btn"
                >
                <v-icon>add</v-icon>
            </v-btn>
        </div> 
        <participantes-modal v-if="onModalMode"
                            @onConfirmModal="confirmModalHandler"
                            @onRestoreModal="restoreModalHandler"
                            @onEditModal="editModalHandler"
        ></participantes-modal>
    </div>
</template>

<script>
import Axios from "axios";
import { mapGetters } from "vuex";
import ParticipantesModal from '../admisiones/ParticipantesModal.vue';

export default {
  name: "listadoParticipantes",

  components: {
    participantesModal: ParticipantesModal
  },

  data() {
    return {
      currentParticipantData: [],
      defaultParticipantData: [],
      currentRoute: "",
      editMode: false,
      onModalMode: false,
      isConfirmed: false
    };
  },

  computed: {
    ...mapGetters({
      config: "getConfigData",
      bootcampData: "getBootcampData",
      bootcampId: "getBootcampId",
      profile: "getProfile",
      editModeActive: "getEditModeActive"
    }),

    getNameBtn() {
      let name = this.profile === "profesor" ? "SEGUIMIENTO" : "FICHA";
      return name;
    },

    isAdmissionProfile(){
      return this.profile === 'admisiones' ? true : false;
    }
  },

  beforeCreate() {
    /* TEMPORAL*/
    //this.$store.commit('setBootcampId', '1.1');
  },

  created() {
    window.scrollTo(0, 0);

    this.setEditMode();

    let arrBootcampsData = [...this.bootcampData.bootcamps];
    let indexBootcampMatched = arrBootcampsData.findIndex(
      item => item._id === this.bootcampId
    );
    let participantsList = null;

    switch (this.$route.name) {
      case "listadoAlumnos":
      case "listadoAlumnosAdmisiones":
      case "listadoAlumnosContabilidad":
        participantsList = [...arrBootcampsData[indexBootcampMatched].studentList];
        this.currentRoute = "alumnos";
        break;
      case "listadoProfesoresAdmisiones":
      case "listadoProfesoresContabilidad":
        participantsList = [...arrBootcampsData[indexBootcampMatched].teacherList];
        this.currentRoute = "profesores";
        break;
    }

    this.currentParticipantData = participantsList;
    this.defaultParticipantData = [...this.currentParticipantData];
  },

  methods:{
      setEditMode() {
        this.editMode = this.editModeActive;
      },

      clickEditHandler(){
          this.editMode = true;
          this.$store.commit('setEditModeActive',true);
      },

      clickConfirmHandler(){
          this.onModalMode = true;
      },

      confirmModalHandler(){
          this.isConfirmed = true;
          this.onModalMode = false;
          this.editMode = false;
          this.$store.commit('setEditModeActive',false);

          /* AÑADIR ENVIO POST DE LOS DATOS DE LOS PARTICIPANTES  */
      },

      restoreModalHandler(){
          this.onModalMode = false;
          this.editMode = false;
          this.currentParticipantData = this.defaultParticipantData;
          this.$store.commit('setEditModeActive',false);
      },

      editModalHandler(){
          //this.onModalMode = true;
      },

      deleteParticipantHandler(participant){
          let indexParticipantMatched = this.currentParticipantData.findIndex(
            item => item === participant
          );

          this.currentParticipantData.splice(indexParticipantMatched,1);
      }
  }
};
</script>
