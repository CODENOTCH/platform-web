<template>
    <div id="alumno-seguimiento" class="interior-ficha">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-2 offset-xl-5 container-img-codenotch">
                    <img class="img-fluid img-codenotch" :src="currentStudentData.photoPath" alt="foto alumno" />
                </div> 
            </div>
            <div class="row">
                <div class="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-6 offset-xl-3 container-data">
                    <p v-html="currentStudentData.description"></p>
                    <div class="alumnos-links">
                        <ul class="list-links">
                            <li v-for="(link,index) of currentStudentData.links" v-bind:key="index">
                                <a class="link-codenotch" :href="link.url" target="_blank">{{link.content}}</a>
                            </li>
                        </ul>
                    </div>
                </div> 
            </div>
            <div class="row">
                <div class="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-6 offset-xl-3 container-comments">
                    <div class="container-week" v-for="(item,index) of currentBootcampData.weeks" v-bind:key="index">
                        <div class="block-name">
                            <h4>{{ item }}</h4>
                            <div class="block-icons">
                                <img v-if="numBox === index && activeConfirmMode" 
                                    :src="setPathIconConfirm" 
                                    alt="icono editar" 
                                    @click="sendComment($event,comments[index].comment,comments[index].confirmedComment)"
                                />
                                <img v-if="numBox === index && activeEditMode"
                                    :src="setPathIconEdit"
                                    alt="icono confirmar"
                                />
                            </div>
                        </div>
                        <div class="block-box">
                            <v-container grid-list-md>
                                <v-layout row wrap>
                                    <v-flex>
                                        <v-text-field box multi-line label="Comentarios" 
                                            @click="boxHandler(comments[index].comment,index)" 
                                            @keyup="boxHandler(comments[index].comment,index)" 
                                            v-model.trim="comments[index].comment"
                                            class="box"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div> 
</template>

<script>
import Axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "alumnoSeguimiento",

  props: ["dataAlumno"],

  data() {
    return {
      currentBootcampData: [],
      currentStudentData: {},
      bootcampId: "",
      studentId: "",
      numBox: null,
      activeConfirmMode: false,
      activeEditMode: false,
      comments: []
    };
  },

  computed: {
    ...mapGetters({
      config: "getConfigData",
      bootcampData: "getBootcampData"
    }),

    setPathIconEdit() {
      return process.env.NODE_ENV === "production"
        ? this.config.imgPathProduction.iconEdit
        : this.config.imgPathDevelopment.iconEdit;
    },

    setPathIconConfirm() {
      return process.env.NODE_ENV === "production"
        ? this.config.imgPathProduction.iconConfirm
        : this.config.imgPathDevelopment.iconConfirm;
    }
  },

  created() {
    window.scrollTo(0, 0);

    this.bootcampId = this.$route.params.bootcampId;
    this.studentId = this.$route.params.studentId;

    let arrBootcampsData = [...this.bootcampData.bootcamps];
    let indexBootcampMatched = arrBootcampsData.findIndex(
      item => item.bootcampId === this.bootcampId
    );

    this.currentBootcampData = arrBootcampsData[indexBootcampMatched];

    let studentList = arrBootcampsData[indexBootcampMatched].studentList;
    let indexStudentMatched = studentList.findIndex(
      item => item.studentId === this.studentId
    );

    this.currentStudentData = studentList[indexStudentMatched];

    this.comments = [...this.currentStudentData.weekComments];
  },

  methods: {
    boxHandler(comment, index) {
      this.numBox = index;
      this.activeConfirmMode = comment !== "" ? true : false;
    },

    sendComment(e,comment,confirmed) {
        console.log(confirmed);
      let btn = e.currentTarget;
      let containerBox = btn.parentNode.parentNode.nextElementSibling;   
      let boxSelected = containerBox.querySelector('.input-group__input');

      boxSelected.classList.add('completed');

      this.activeConfirmMode = false;
      this.activeEditMode = true;

      console.log("comment:", comment);
    }
  }
};
</script>

<style lang='stylus'>
@import '../../../stylus/main';
@import '../../../stylus/vars';

.input-group__input {
    background: $white;

    &.completed {
        background: $darkWhite;
        pointer-events: none;
    }
}

.input-group--focused.primary--text {
    color: $purple;
}

.input-group label {
    color: $grey;
}
</style>  
