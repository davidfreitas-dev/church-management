<template>
  <ion-page>
    <header-top :title="'Escala de Pregadores'" :back-route="backRoute"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <preachers-time-line></preachers-time-line>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue';
import HeaderTop from '@/components/HeaderTop.vue';
import PreachersTimeLine from '@/components/PreachersTimeLine.vue';

export default ({
  name: 'HomePage',
  components: { IonContent,  IonPage, HeaderTop, PreachersTimeLine },
  data() {
    return {
      backRoute: '/ancient'
    }
  },
});
</script>

<style scoped>

</style>
