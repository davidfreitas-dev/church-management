import { createStore } from 'vuex';

import date from './modules/date';

const store = createStore({
    modules: { date }
});

export default store;