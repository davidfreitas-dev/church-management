<template>
  <ion-page>
    <header-top :title="pageTitle" :back-route="backRoute" :right-button-name="'Salvar'"
      :left-button="true" :right-button="true" @handleClick="handleSave"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <span class="title" v-if="monthName && year">{{ monthName }}, {{ year }}</span>

        <div class="timeline" v-if="timeline.data.length">
          <template v-for="(event, i) in timeline.data" :key="i">
            <div class="wrapper" :class="event.position">
              <div class="content">
                <p class="description text-light">{{ event.weekDay }}</p>
                <span class="sub-title" v-if="event.recepcionist">{{ event.recepcionist }}</span>
                <span class="sub-title" v-else>Pendente</span>
                <p class="description text-primary text-bold">{{ event.date }}</p>
                <div class="options" @click="handleEdit(event)">
                  <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                </div>
              </div>
            </div>
          </template>
        </div>

        <ion-modal :is-open="showModal" :breakpoints="[0, 0.2, 0.5, 1]" :initialBreakpoint="0.5">
          <ion-content>
            <div class="modal-content">
              <p class="description text-light">Nome dos recepcionistas:</p>
              <input type="text" class="form-input" v-model="recepcionist" @keyup.enter="handleConfirm"/>
              <button class="btn-large bg-success" @click="handleConfirm">Salvar</button>
              <button class="btn-link" @click="showModal = false">Cancelar</button>
            </div>
          </ion-content>
        </ion-modal>

        <loader-box ref="loader"></loader-box>
        
        <toast-message ref="toast" :toast-data="toastData"></toast-message>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonModal, IonIcon } from '@ionic/vue';
import { mapGetters } from 'vuex';
import HeaderTop from '@/components/HeaderTop.vue';
import LoaderBox from '@/components/LoaderBox.vue';
import ToastMessage from '@/components/ToastMessage.vue';

export default ({
  name: 'HomePage',
  components: { IonContent, IonPage, IonModal, IonIcon, HeaderTop, LoaderBox, ToastMessage },
  data() {
    return {
      pageTitle: 'Escala Recepção',
      backRoute: '/reception',
      timeline: { id: null, data: [] },
      event: null,
      recepcionist: null,
      showModal: false,
      toastData: {}
    }
  },
  computed: {
    ...mapGetters({
      year: 'date/year',
      months: 'date/months',
      month: 'date/month',
      monthName: 'date/monthName',
      days: 'date/days'
    })
  },
  methods: {
    async loadData() {
      const self = this;

      await this.$axios.get('recepcionists-timeline.json')
        .then(async function(response) {          
          if (response.data) {
            console.log(response.data);

            const key = Object.keys(response.data)[0];
            const data = response.data[key];
            
            self.timeline = { id: key, data: data };

            return;
          }

          self.setTimeline();
        })
        .catch(error => {
          self.handleToast('danger', 'Erro ao carregar os dados: ' + error);
        });
    },
    setTimeline() {
      let timeline = [];

      this.days.forEach(day => {
        const weekDay = this.getDayOfWeek(day, this.monthName, this.year);
        
        let obj = {}

        switch (weekDay) {
          case 0:
            obj.date = day + '/' + this.month;
            obj.weekDay = 'Domingo';
            timeline.push(obj);
            break;
          
          case 3:
            obj.date = day + '/' + this.month;
            obj.weekDay = 'Quarta';
            timeline.push(obj);
            break;

          case 6:
            obj.date = day + '/' + this.month;
            obj.weekDay = 'Sábado';
            timeline.push(obj);
            break;
        
          default:
            break;
        }        
      });

      timeline.forEach((element) => {
        let index = timeline.indexOf(element);
        
        if (index % 2 !== 0) {
          element.position = 'right';
        }

        if (index % 2 === 0) {
          element.position = 'left';
        }
      });

      this.timeline = { id: null, data: timeline };
    },
    getDayOfWeek(day, monthName, year) {
      const date = new Date(`${monthName} ${day}, ${year} 00:00:00`);
      return date.getDay();
    },
    handleEdit(event) {
      this.showModal = true;
      this.event = event;
    },
    handleConfirm() {
      this.event.recepcionist = this.recepcionist;
      this.showModal = false;
      this.recepcionist = null;
      this.event = null;
    },
    handleToast(color, message) {
      this.toastData = { 
        color: color,
        message: message
      };

      this.$refs.toast.setOpen(true);
    },
    async handleSave() {
      const self = this;
      const timelineId = this.timeline.id;

      const method = timelineId ? 'patch' : 'post';
      const url = timelineId 
        ? `recepcionists-timeline/${timelineId}.json` 
        : 'recepcionists-timeline.json';

      this.$refs.loader.setOpen(true);

      const timeline = { ...this.timeline.data };

      await this.$axios[method](url, timeline)
        .then(async function(response) {
          if (response.data) {
            self.handleToast('success', 'Salvo com sucesso!');
            self.loadData();            
          }
        })
        .catch(error => {
          self.handleToast('danger', 'Erro ao salvar os dados: ' + error);
        })
        .finally(() => {
          self.$refs.loader.setOpen(false);
        });
    }
  },
  created () {
    this.loadData();
  },
});
</script>

<style scoped>
.modal-content {
  width: 90%;
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>