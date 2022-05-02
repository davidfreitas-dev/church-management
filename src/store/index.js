import { createStore } from 'vuex';

import date from './modules/date';
import ancient from './modules/ancient';

const store = createStore({
    modules: { date, ancient }
});

export default store;