import { createStore } from 'vuex';

import date from './modules/date';
import ancient from './modules/ancient';

const store = createStore({
    state() {
        return {
            
        }
    },
    getters: {
        
    },
    mutations: {
        
    },
    actions: {
        
    },
    modules: { date, ancient }
});

export default store;