<template>
    <div class="header">
        <nav class="nav">
            <div class="left-button" @click="handleBack">
                <ion-icon name="chevron-back-outline" v-if="leftButton"></ion-icon>
            </div>

            <div class="title">{{ title }}</div>

            <div class="right-button" @click="$emit('handleClick')">
                <p class="description text-primary text-bold" v-if="rightButton">Salvar</p>
            </div>
        </nav>
    </div>
</template>

<script>
import { IonIcon } from '@ionic/vue';

export default {
    emits: ['handleClick'],
    props: {
        title: {
            type: String,
            default: ''
        },
        leftButton: {
            type: Boolean,
            default: false
        },
        rightButton: {
            type: Boolean,
            default: false
        },
        backRoute: {
            type: String,
            default: '/'
        },

    },
    components: {
        IonIcon,
    },
    methods: {
        handleBack() {
            this.$router.push(this.backRoute);
        }
    },
}
</script>

<style socped>
.left-button {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    color: var(--font-dark);
    background-color: transparent;

    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.right-button {
    width: 50px;
    height: 50px;
    
    display: flex;
    justify-content: center;
    align-items: center;
}

.right-button ion-icon {
    padding: .5rem;
    font-size: 1.1rem;
    border-radius: 10px;
    color: var(--primary);
    background-color: #c8dbf3;
}
</style>