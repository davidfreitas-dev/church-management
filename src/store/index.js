import { createStore } from 'vuex';

import date from './modules/date'

const store = createStore({
    state() {
        return {
            data: []
        }
    },
    getters: {
        data(state) {
            return state.data;
        }
    },
    mutations: {
        setData(state, data) {
            state.data = data;
        },
    },
    actions: {
        setData({ commit }, data) {
            commit('setData', data);
        },
    },
    modules: { date }
});

export default store;