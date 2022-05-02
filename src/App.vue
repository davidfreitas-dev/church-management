<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';

export default ({
  name: 'App',
  components: {
    IonApp, IonRouterOutlet
  },
  created () {
    this.$store.dispatch('date/setDate');
  },
});
</script>