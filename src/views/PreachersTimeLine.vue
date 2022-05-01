<template>
  <ion-page>
    <header-top :title="pageTitle" :back-route="backRoute"
      :left-button="true" :right-button="true" @handleClick="handleSaveTimeline"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <preachers-time-line ref="timeline"></preachers-time-line>
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
      pageTitle: 'Escala de Pregadores',
      backRoute: '/ancient'
    }
  },
  methods: {
    handleSaveTimeline() {
      this.$refs.timeline.handleSave();
    }
  },
});
</script>

<style scoped>

</style>
