export default {
    namespaced: true,
    state: {
        year: null,
        months: null,
        monthName: null,
        month: null,
        days: null,
    },
    getters: {
        year(state) {
            return state.year;
        },
        months(state) {
            return state.months;
        },
        monthName(state) {
            return state.monthName;
        },
        month(state) {
            return state.month;
        },
        days(state) {
            return state.days;
        },
    },
    mutations: {
        setYear(state, year) {
            state.year = year;
        },
        setMonthName(state, monthName) {
            state.monthName = monthName;
        },
        setMonths(state, months) {
            state.months = months;
        },
        setMonth(state, month) {
            state.month = month;
        },
        setDays(state, days) {
            state.days = days;
        },
    },
    actions: {
        setDate({ commit, getters }) {
            const date = new Date();
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

            commit('setMonths', months);
            commit('setMonth', date.getMonth());
            commit('setMonthName', months[date.getMonth()]);
            commit('setYear', date.getFullYear());
            
            function getDaysOfMonth(month, year) {
                month--;

                let days = [];
                let date = new Date(year, month, 1);

                while (date.getMonth() === month) {
                    days.push(date.getDate());
                    date.setDate(date.getDate() + 1);
                }
                
                return days;
            }

            const year = getters.year;
            const month = getters.month;

            commit('setDays', getDaysOfMonth(month, year));
        },
    }
}