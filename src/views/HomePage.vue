<template>
  <ion-page>
    <header-top :title="'App Design System'"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <!-- Typography -->
        <p class="title">Lorem ipsum dolor sit amet</p>
        <p class="sub-title">Lorem ipsum dolor sit amet</p>
        <p class="description">Lorem ipsum dolor sit amet</p>
        
        <!-- Buttons -->
        <button class="btn-icon bg-primary">
          <ion-icon name="rocket"></ion-icon>
        </button><br />
        <button class="btn-small bg-alert">Button</button><br />
        <button class="btn-default bg-danger">Button Default</button>
        <button class="btn-large bg-success">Button Large</button>

        <!-- Inputs -->
        <input type="text" placeholder="Type your name here" class="form-input" />
        <input type="text" placeholder="Input Disabled" class="form-input" disabled>
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
