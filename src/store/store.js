import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
    versionIE: undefined,
    configData: '',
    indexProgramData: '',
    isOnlyMobile: false,
    isMobileOrTable: false,
    /*isOpenIndexProgram: false,*/
    logged: false,
    profile: 'alumno'
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store