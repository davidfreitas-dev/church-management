<template>
  <ion-loading :is-open="isOpenRef" cssClass="my-custom-class" :message="message" @didDismiss="setOpen(false)"></ion-loading>
</template>

<script>
import { IonLoading } from '@ionic/vue';

export default ({
  props: {
    message: {
      type: String,
      default: 'Aguarde...'
    },
  },
  components: { 
    IonLoading 
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
});
</script>