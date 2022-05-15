<template>
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <ion-buttons slot="start" class="defaultWidth">
        <ion-back-button icon="chevron-back-outline"></ion-back-button>
      </ion-buttons>
      <ion-title class="header-title ion-text-center">
        {{ title }}
      </ion-title>
      <ion-buttons slot="end" :class="{ defaultWidth: !action }">
        <ion-icon name="add" class="icon ion-padding" @click="$emit('handleClick')" v-if="action"></ion-icon>
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
    action: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonIcon,
  }
}
</script>

<style scoped>

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