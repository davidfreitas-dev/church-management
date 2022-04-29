<template>
  <ion-page>
    <header-top :title="'Ancionato'"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <div class="tags-wrapper">
          <div class="tag">            
            <div class="tag-icon bg-primary">
              <ion-icon name="rocket"></ion-icon>
            </div>
            <div class="tag-content">
              <span>Pregadores</span>
            </div>
          </div>

          <div class="tag">            
            <div class="tag-icon bg-success">
              <ion-icon name="rocket"></ion-icon>
            </div>
            <div class="tag-content">
              <span>Reuniões</span>
            </div>
          </div>

          <div class="tag">            
            <div class="tag-icon bg-danger">
              <ion-icon name="rocket"></ion-icon>
            </div>
            <div class="tag-content">
              <span>Anúncios</span>
            </div>
          </div>

          <div class="tag">            
            <div class="tag-icon bg-alert">
              <ion-icon name="rocket"></ion-icon>
            </div>
            <div class="tag-content">
              <span>Obs</span>
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
  components: { IonContent,  IonPage, IonIcon, HeaderTop }
});
</script>

<style scoped>

</style>
