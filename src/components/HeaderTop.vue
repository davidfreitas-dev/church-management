<template>
    <div class="header">
        <nav class="nav">
            <div class="back-button" @click="handleBack">
                <ion-icon name="chevron-back-outline"></ion-icon>
            </div>

            <div class="title">{{ title }}</div>

            <div class="icon-button">
                <ion-icon name="notifications-outline"></ion-icon>
            </div>
        </nav>
    </div>
</template>

<script>
import { IonIcon } from '@ionic/vue';

export default {
    props: {
        title: {
            type: String,
            default: ''
        },
    },
    components: {
        IonIcon,
    },
    computed: {
        routeFrom() {
            return this.$store.getters.routeFrom;
        }
    },
    watch: { 
        '$route': {
            deep: true,
            handler(to, from) {
                this.$store.dispatch('setRouteFrom', from.path);
            },
        }
    },
    data() {
        return {
            route: null
        }
    },
    methods: {
        handleBack() {
            this.$router.push(this.routeFrom);
        }
    },
}
</script>

<style socped>
.back-button {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    color: var(--font-dark);
    background-color: transparent;

    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.icon-button {
    width: 50px;
    height: 50px;
    
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon-button ion-icon {
    padding: .5rem;
    font-size: 1.1rem;
    border-radius: 10px;
    color: var(--primary);
    background-color: #c8dbf3;
}
</style>