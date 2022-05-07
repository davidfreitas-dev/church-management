<template>
  <ion-page>
    <header-top :left-button="true" :title="pageTitle" :back-route="backRoute"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <!-- Typography -->
        <p class="text text-bold">Lorem ipsum dolor sit amet</p>
        <p class="text">Lorem ipsum dolor sit amet</p>
        <p class="text text-grey">Lorem ipsum dolor sit amet</p>
        <p class="text text-light">Lorem ipsum dolor sit amet</p>

        <!-- Buttons -->
        <button class="btn-rounded">Rounded</button><br />
        <button class="btn btn-link">Button Link</button><br />
        <button class="btn bg-primary">Button</button><br />
        <button class="btn btn-full bg-danger">Button Full</button>

        <!-- Inputs -->
        <input type="text" placeholder="Type your name here" class="form-input" />
        <input type="text" placeholder="Input Disabled" class="form-input" disabled>

        <!-- Cards -->
        <div class="cards-wrapper">
          <div class="card bg-primary">
            <div class="card-icon text-primary">
              <ion-icon name="accessibility"></ion-icon>
            </div>
            <div class="card-content">
              <p class="text-primary-light">Description</p>
              <span>Details</span>
            </div>
          </div>

          <div class="card bg-success">
            <div class="card-icon text-success">
              <ion-icon name="accessibility"></ion-icon>
            </div>
            <div class="card-content">
              <p class="text-success-light">Description</p>
              <span>Details</span>
            </div>
          </div>

          <div class="card bg-danger">
            <div class="card-icon text-danger">
              <ion-icon name="accessibility"></ion-icon>
            </div>
            <div class="card-content">
              <p class="text-danger-light">Description</p>
              <span>Details</span>
            </div>
          </div>

          <div class="card bg-alert">
            <div class="card-icon text-alert">
              <ion-icon name="accessibility"></ion-icon>
            </div>
            <div class="card-content">
              <p class="text-alert-light">Description</p>
              <span>Details</span>
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div class="tags-wrapper">
          <div class="tag">            
            <div class="tag-icon bg-primary">
              <ion-icon name="rocket"></ion-icon>
            </div>
            <div class="tag-content">
              <span>Details</span>
            </div>
          </div>

          <div class="tag">            
            <div class="tag-icon bg-success">
              <ion-icon name="rocket"></ion-icon>
            </div>
            <div class="tag-content">
              <span>Details</span>
            </div>
          </div>

          <div class="tag">            
            <div class="tag-icon bg-danger">
              <ion-icon name="rocket"></ion-icon>
            </div>
            <div class="tag-content">
              <span>Details</span>
            </div>
          </div>

          <div class="tag">            
            <div class="tag-icon bg-alert">
              <ion-icon name="rocket"></ion-icon>
            </div>
            <div class="tag-content">
              <span>Details</span>
            </div>
          </div>
        </div>

        <!-- List -->
        <div class="list">
          <div class="list-item">
            <div class="list-content">
              <button class="btn-icon bg-success">
                <ion-icon name="logo-whatsapp"></ion-icon>
              </button><br />
              <div class="list-desc">
                <span class="text">Mark Finley</span>
                <span class="text text-grey">Central IASD - USA</span>
              </div>
            </div>
            <div class="list-action">
              <ion-icon name="ellipsis-vertical-outline"></ion-icon>
            </div>
          </div>

          <div class="list-item">
            <div class="list-content">
              <button class="btn-icon bg-success">
                <ion-icon name="logo-whatsapp"></ion-icon>
              </button><br />
              <div class="list-desc">
                <span class="text">Alejandro Bullon</span>
                <span class="text text-grey">IASD South America</span>
              </div>
            </div>
            <div class="list-action">
              <ion-icon name="ellipsis-vertical-outline"></ion-icon>
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
      pageTitle: 'App Design System',
      backRoute: '/home'
    }
  },
});
</script>

<style scoped>
.container {
  margin-bottom: 3rem;
}
</style>
