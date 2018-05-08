import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
    versionIE: undefined,
    configData: '',
    programData: '',
    bootcampData: '',
    bootcampId: '',
    userId: '',
    isOnlyMobile: false,
    isMobileOrTable: false,
    logged: false,
    profile: '',
    isProgram: false,
    isBootcamp: false, 
    dataStudentSelected: [],
    editModeActive: false
};

const store = new Vuex.Store({
    state,
    getters,
    mutations
});

export default store;