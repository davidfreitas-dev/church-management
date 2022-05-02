<template>
  <ion-toast :is-open="isOpenRef" :message="toastData.message" :color="toastData.type" :duration="toastData.duration" @didDismiss="setOpen(false)"></ion-toast>
</template>

<script>
import { IonToast } from '@ionic/vue';

export default {
  props: {
    toastData: {
      type: Object,
      require: true
    },
  },
  components: {
    IonToast,
  },
  data() {
    return {
      isOpenRef: false
    }
  },
  methods: {
    setOpen(state) {
      this.isOpenRef = state;
    }
  },
}
</script>

<style>

</style>