<template>
  <ion-page>
    <header-top :title="'Ancionato'" :back-route="backRoute"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <div class="tags-wrapper">
          <div class="tag" @click="this.$router.push('/preachers-timeline')">            
            <div class="tag-icon bg-primary">
              <ion-icon name="calendar-number"></ion-icon>
            </div>
            <div class="tag-content">
              <span>Escala</span>
            </div>
          </div>

          <div class="tag" @click="this.$router.push('/preachers-list')">
            <div class="tag-icon bg-alert">
              <ion-icon name="people"></ion-icon>
            </div>
            <div class="tag-content">
              <span>Pregadores</span>
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
  name: 'HomePage',
  components: { IonContent,  IonPage, IonIcon, HeaderTop },
  data() {
    return {
      backRoute: '/home'
    }
  },
});
</script>

<style scoped>

</style>
