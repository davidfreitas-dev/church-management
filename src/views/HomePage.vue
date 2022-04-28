<template>
  <ion-page>
    <header-top></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <!-- Content Here -->
        <p class="title">Lorem ipsum dolor sit amet</p>
        <p class="sub-title">Lorem ipsum dolor sit amet</p>
        <p class="">Lorem ipsum dolor sit amet</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue';
import HeaderTop from '@/components/HeaderTop.vue';

export default ({
  name: 'HomePage',
  components: { IonContent,  IonPage, HeaderTop }
});
</script>

<style scoped>

</style>
