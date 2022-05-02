export default {
    namespaced: true,
    state: {
        preachers: { 
            timeline: [], 
            contacts: [] 
        }
    },
    getters: {
        preachers(state) {
            return state.preachers;
        }
    },
    mutations: {
        setTimeline(state, timeline) {
            state.preachers.timeline = timeline;
        },
        setContacts(state, contacts) {
            state.preachers.contacts = contacts;
        },
    },
    actions: {
        setTimeline({ commit }, timeline) {
            commit('setTimeline', timeline);
        },
        setContacts({ commit }, contacts) {
            commit('setContacts', contacts);
        },
    }
}