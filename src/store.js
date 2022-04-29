import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            routeFrom: null
        }
    },
    getters: {
        routeFrom(state) {
            return state.routeFrom;
        }
    },
    mutations: {
        setRouteFrom(state, route) {
            state.routeFrom = route;
        },
    },
    actions: {
        setRouteFrom({ commit }, route) {
            commit('setRouteFrom', route);
        },
    }
});

export default store;