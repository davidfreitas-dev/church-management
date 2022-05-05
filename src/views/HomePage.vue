<template>
  <ion-page>
    <header-top :title="pageTitle"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <div class="departments cards-wrapper">
          <div class="card bg-primary" @click="$router.push('/ancient')">
            <div class="card-icon text-primary">
              <ion-icon name="book"></ion-icon>
            </div>
            <div class="card-content">
              <p class="text-primary-light">Ministério</p>
              <span>Ancionato</span>
            </div>
          </div>

          <div class="card bg-success" @click="$router.push('/music')">
            <div class="card-icon text-success">
              <ion-icon name="musical-notes"></ion-icon>
            </div>
            <div class="card-content">
              <p class="text-success-light">Ministério</p>
              <span>Música</span>
            </div>
          </div>

          <div class="card bg-alert" @click="$router.push('/reception')">
            <div class="card-icon text-alert">
              <ion-icon name="accessibility"></ion-icon>
            </div>
            <div class="card-content">
              <p class="text-alert-light">Ministério</p>
              <span>Recepção</span>
            </div>
          </div>

          <div class="card bg-danger" @click="$router.push('/media')">
            <div class="card-icon text-danger">
              <ion-icon name="megaphone"></ion-icon>
            </div>
            <div class="card-content">
              <p class="text-danger-light">Ministério</p>
              <span>Mídia</span>
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
      pageTitle: 'Departamentos'
    }
  },
});
</script>

<style scoped>

</style>
