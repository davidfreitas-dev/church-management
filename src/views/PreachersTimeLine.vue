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
    async loadData() {
      const self = this;

      await this.$axios.get('preachers.json')
        .then(async function(res) {
          if (res.data && res.status === 200) {
            const key = Object.keys(res.data)[0];
            const preachers = res.data[key];
            
            self.$store.dispatch('ancient/setTimeline', preachers.timeline);
          }
        })
        .catch(err => {
          console.log('Erro ao carregar os dados: ', err);
        });
    },
    handleSaveTimeline() {
      this.$refs.timeline.handleSave();
    }
  },
  created () {
    this.loadData();
  },
});
</script>

<style scoped>

</style>
