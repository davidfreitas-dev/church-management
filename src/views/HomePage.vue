<template>
  <ion-page>
    <header-top></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <!-- Typography -->
        <p class="title">Lorem ipsum dolor sit amet</p>
        <p class="sub-title">Lorem ipsum dolor sit amet</p>
        <p class="description">Lorem ipsum dolor sit amet</p>
        
        <!-- Buttons -->
        <button class="btn-small bg-primary">N</button><br />
        <button class="btn-default bg-alert">Button</button>
        <button class="btn-large bg-success">Button Large</button>
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
