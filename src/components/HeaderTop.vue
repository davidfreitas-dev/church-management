<template>
  <ion-header class="ion-no-border">
    <ion-toolbar>

      <ion-buttons slot="start" class="defaultWidth">
        <ion-back-button icon="chevron-back-outline"></ion-back-button>
      </ion-buttons>

      <ion-title class="header-title ion-text-center">
        {{ title }}
      </ion-title>

      <ion-buttons slot="end" :class="{ defaultWidth: !addButton && !saveButton }">
        
        <ion-icon name="add" class="icon ion-padding" 
          @click="handleClick" v-if="addButton"></ion-icon>
        
        <ion-icon name="checkmark" class="icon ion-padding" 
          @click="handleClick" v-if="saveButton"></ion-icon>

      </ion-buttons>

    </ion-toolbar>
  </ion-header>
</template>

<script>
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonIcon } from '@ionic/vue';

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    addButton: {
      type: Boolean,
      default: false
    },
    saveButton: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonIcon,
  },
  methods: {
    handleClick() {
      this.$emit('handleClick');
    }
  },
}
</script>

<style scoped>

ion-header {
  box-shadow: 0px -3px 5px 0px rgba(92,92,92,1);
}

ion-title.header-title {
  color: var(--font);
  font-size: 1.15rem;
  font-weight: 700;
}

ion-buttons.defaultWidth {
  width: 3rem;
}

ion-icon.icon {
  font-size: 24px;
  color: var(--primary);
  --ionicon-stroke-width: 48px;
}

</style>