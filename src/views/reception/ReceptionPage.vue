<template>
  <ion-page>
    <header-top :title="pageTitle"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <div class="tags-wrapper">
          <div class="tag" @click="this.$router.push('/receptionists-timeline')">            
            <div class="tag-icon bg-primary">
              <ion-icon name="calendar-number"></ion-icon>
            </div>
            <div class="tag-content">
              <span>Escala</span>
            </div>
          </div>

          <div class="tag" @click="this.$router.push('/visitors-list')">            
            <div class="tag-icon bg-success">
              <ion-icon name="people"></ion-icon>
            </div>
            <div class="tag-content">
              <span>Visitantes</span>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonIcon } from '@ionic/vue';
import HeaderTop from '@/components/HeaderTop.vue';

export default ({
  name: 'ReceptionPage',
  components: { IonContent,  IonPage, IonIcon, HeaderTop },
  data() {
    return {
      pageTitle: 'Recepção',
      backRoute: '/home'
    }
  },
});
</script>

<style scoped>

</style>
