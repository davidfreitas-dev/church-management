<template>
  <ion-page>
    <header-top :title="pageTitle" :back-route="backRoute" :right-button-name="'Salvar'"
      :left-button="true" :right-button="true" @handleClick="handleSave"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <div class="timeline-header">
          <span class="text" v-if="monthName && year">{{ monthName }}, {{ year }}</span>
          <button class="btn-rounded" @click="handleFilter(filter)">
            {{ filter }}
          </button>
        </div>

        <time-line :timeline="timelineData" @handleClick="handleEdit"></time-line>

        <ion-modal :is-open="showModal" :breakpoints="[0, 0.2, 0.5, 1]" :initialBreakpoint="0.5">
          <ion-content>
            <div class="modal-content">
              <p class="text-light">Nome dos recepcionistas:</p>
              <input type="text" class="form-input" v-model="name" @keyup.enter="handleConfirm"/>
              <button class="btn btn-full bg-primary bg-success" @click="handleConfirm">Confirmar</button>
              <button class="btn btn-link" @click="showModal = false">Cancelar</button>
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
import { IonContent, IonPage, IonModal } from '@ionic/vue';
import { mapGetters } from 'vuex';
import HeaderTop from '@/components/HeaderTop.vue';
import TimeLine from '@/components/TimeLine.vue';
import LoaderBox from '@/components/LoaderBox.vue';
import ToastMessage from '@/components/ToastMessage.vue';

export default ({
  name: 'HomePage',
  components: { IonContent, IonPage, IonModal, HeaderTop, TimeLine, LoaderBox, ToastMessage },
  data() {
    return {
      pageTitle: 'Escala Recepção',
      backRoute: '/reception',
      timeline: { id: null, data: [] },
      event: null,
      name: null,
      showModal: false,
      toastData: {},
      filter: 'Todos'
    }
  },
  computed: {
    ...mapGetters({
      year: 'date/year',
      months: 'date/months',
      month: 'date/month',
      monthName: 'date/monthName',
      days: 'date/days'
    }),
    timelineData() {
      return this.timeline.data.filter(obj => {
        if (this.filter !== 'Todos') {
          return obj.weekDay === this.filter;
        }
        return obj;
      })
    }
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

      const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

      this.days.forEach(day => {         
        let obj = {};

        const date = new Date(`${this.monthName} ${day}, ${this.year} 00:00:00`);
        const nameDay = weekDays[date.getDay()];

        if (nameDay === 'Domingo' || nameDay === 'Quarta' || nameDay === 'Sábado') {
          obj.date = String(day).padStart(2, '0') + '/' + String(this.month + 1).padStart(2, '0');
          obj.weekDay = nameDay;
          obj.outdated = obj.date < this.currentDate ? true : false;
          timeline.push(obj);
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
    handleEdit(index) {
      this.showModal = true;
      this.event = this.timeline.data[index];
    },
    handleConfirm() {
      this.event.name = this.name.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
      this.showModal = false;
      this.name = null;
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
    },
    handleFilter(filter) {
      if (filter === 'Todos') {
        this.filter = 'Domingo';
      }

      if (filter === 'Domingo') {
        this.filter = 'Quarta';
      }

      if (filter === 'Quarta') {
        this.filter = 'Sábado';
      }

      if (filter === 'Sábado') {
        this.filter = 'Todos';
      }
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