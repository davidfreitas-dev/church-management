<template>
  <ion-page>
    <header-top :title="pageTitle" :back-route="backRoute"
      :left-button="true" :right-button="true" @handleClick="handleSave"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <span class="title" v-if="monthName && year">{{ monthName }}, {{ year }}</span>

        <div class="timeline" v-if="timeline.data.length">
          <template v-for="(event, i) in timeline.data" :key="i">
            <div class="wrapper right">
              <div class="content">
                <p class="description text-light text-thin">{{ event.weekDay }}</p>
                <span class="sub-title" v-if="event.preacher">{{ event.preacher }}</span>
                <span class="sub-title" v-else>Pendente</span>
                <p class="description text-primary">{{ event.date }}</p>
                <div class="options" @click="handleEdit(event)">:</div>
              </div>
            </div>
          </template>
        </div>

        <ion-modal :is-open="showModal" :breakpoints="[0, 0.2, 0.5, 1]" :initialBreakpoint="0.5">
          <ion-content>
            <div class="modal-content">
              <p class="description text-light">Nome do pregador:</p>
              <input type="text" class="form-input" v-model="preacher" @keyup.enter="handleConfirm"/>
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
import { IonContent, IonPage, IonModal } from '@ionic/vue';
import { mapGetters } from 'vuex';
import HeaderTop from '@/components/HeaderTop.vue';
import LoaderBox from '@/components/LoaderBox.vue';
import ToastMessage from '@/components/ToastMessage.vue';

export default ({
  name: 'HomePage',
  components: { IonContent, IonPage, IonModal, HeaderTop, LoaderBox, ToastMessage },
  data() {
    return {
      pageTitle: 'Escala de Pregadores',
      backRoute: '/ancient',
      timeline: { id: null, data: [] },
      event: null,
      preacher: null,
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

      await this.$axios.get('preachers-timeline.json')
        .then(async function(response) {          
          if (response.data) {
            let timeline = self.timeline;

            timeline.id = Object.keys(response.data)[0];
            timeline.data = response.data[timeline.id];

            return;
          }

          self.setTimeline();
        })
        .catch(err => {
          console.log('Erro ao carregar os dados: ', err);
          self.handleToast('danger', 'Erro ao carregar os dados');
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
      this.event.preacher = this.preacher;
      this.showModal = false;
      this.preacher = null;
      this.event = null;
    },
    handleToast(type, message) {
      this.toastData = { 
        message: message,
        type: type, 
        duration: 1500 
      };

      this.$nextTick(() => {
        this.$refs.toast.setOpen(true);
      });
    },
    async handleSave() {
      const self = this;
      const timelineId = this.timeline.id;

      const method = timelineId ? 'patch' : 'post';
      const url = timelineId 
        ? `preachers-timeline/${timelineId}.json` 
        : 'preachers-timeline.json';

      this.$nextTick(() => {
        this.$refs.loader.setOpen(true);
      });

      await this.$axios[method](url, this.timeline.data)
        .then(async function(response) {
          if (response.data) {
            self.handleToast('success', 'Salvo com sucesso!');
            self.loadData();            
          }
        })
        .catch(err => {
          console.log('Erro ao salvar os dados: ', err);
          self.handleToast('danger', 'Erro ao salvar os dados');
        })
        .finally(() => {
          this.$nextTick(() => {
            this.$refs.loader.setOpen(false);
          });                    
        });
    }
  },
  created () {
    this.loadData();
  },
});
</script>

<style scoped>
/* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 1rem auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: '';
  position: absolute;
  width: 3.5px;
  background-color: var(--primary);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

/* wrapper around content */
.wrapper {
  padding: 10px 20px;
  position: relative;
  background-color: inherit;
  width: 50%;
}

/* The circles on the timeline */
.wrapper::after {
  content: '';
  position: absolute;
  width: 17px;
  height: 17px;
  right: -12px;
  background-color: var(--primary);
  border: 4px solid var(--bg-color);
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the wrapper to the left */
.left {
  left: 0;
}

/* Place the wrapper to the right */
.right {
  left: 50%;
}

/* Add arrows to the left wrapper (pointing right) */
.left::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 18px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid var(--primary);
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent var(--bg-color);
}

/* Add arrows to the right wrapper (pointing left) */
.right::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 18px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid var(--primary);
  border-width: 10px 10px 10px 0;
  border-color: transparent var(--bg-color) transparent transparent;    
}

/* Fix the circle for wrappers on the right side */
.right::after {
  left: -13px;
}

/* The actual content */
.content {
  position: relative;
  padding: 10px 20px;
  background-color: var(--bg-color);
  box-shadow: -5px 5px 30px -5px rgba(0,0,0,0.1);
  position: relative;
  border-radius: 10px;
}

.options {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.5rem;
  font-weight: 700;
  padding: .5rem 1.3rem;
  color: var(--font-light);
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
/* Place the timelime to the left */
  .timeline::after {
    left: 31px;
  }

/* Full-width wrappers */
  .wrapper {
    width: 100%;
    padding-left: 65px;
    padding-right: 10px;
  }

/* Make sure that all arrows are pointing leftwards */
  .wrapper::before {
    left: 57px;
    border: medium solid var(--primary);
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }

/* Make sure all circles are at the same spot */
  .left::after, .right::after {
    left: 17px;
  }

/* Make all right wrappers behave like the left ones */
  .right {
    left: 0%;
  }
}

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