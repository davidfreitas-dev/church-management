export default {
    state() {
        return {
            preachers: { 
                timeline: [], 
                contacts: [] 
            }
        }
    },
    getters: {
        timeline(state) {
            return state.preachers.timeline;
        },
        contacts(state) {
            return state.preachers.contacts;
        },
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
        setPreachersTimeline({ commit }, timeline) {
            commit('setTimeline', timeline);
        },
        setPreachersContacts({ commit }, contacts) {
            commit('setContacts', contacts);
        },
    }
}