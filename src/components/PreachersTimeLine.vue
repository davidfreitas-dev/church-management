<template>
  <span class="title" v-if="monthName && year">{{ monthName }}, {{ year }}</span>
  <div class="timeline">
    <template v-for="(item, i) in tlData" :key="i">
      <div class="wrapper right">
        <div class="content">
          <p class="description text-light text-thin">{{ item.weekDay }}</p>
          <span class="sub-title" v-if="item.preacher">{{ item.preacher }}</span>
          <span class="sub-title" v-else>Pendente</span>
          <p class="description text-primary">{{ item.date }}</p>
          <div class="options" @click="handleEdit(item)">:</div>
        </div>
      </div>
    </template>
  </div>
  <ion-modal :is-open="showModal" :breakpoints="[0, 0.2, 0.5, 1]" :initialBreakpoint="0.5">
    <ion-content>
      <div class="modal-content">
        <p class="description text-light">Nome do pregador:</p>
        <input type="text" class="form-input" v-model="preacher"/>
        <button class="btn-large bg-success" @click="handleConfirm">Salvar</button>
        <button class="btn-link" @click="showModal = false">Cancelar</button>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script>
import { IonContent, IonModal } from '@ionic/vue';

export default {
  components: {
    IonContent, IonModal
  },
  data() {
    return {
      tlData: [],
      months : ["January","February","March","April","May","June","July","August","September","October","November","December"],
      year: null,
      month: null,
      monthName: null,
      days: null,
      preacher: null,
      showModal: false,
      item: null
    }
  },
  methods: {
    loadData() {
      const date = new Date();
      
      this.year = date.getFullYear();
      this.month = date.getMonth();
      this.monthName = this.months[date.getMonth()];

      this.getDaysOfMonth(this.month, this.year);
      this.setTimeLine(this.days, this.monthName, this.month, this.year);
    },
    getDaysOfMonth(month, year) {
      month--;

      let days = [];
      let date = new Date(year, month, 1);

      while (date.getMonth() === month) {
        days.push(date.getDate());
        date.setDate(date.getDate() + 1);
      }

      this.days = days;
    },
    getDayOfWeek(day, month, year) {
      const time = '00:00:00';

      const date = new Date(`${month} ${day}, ${year} ${time}`);
      let weekDay = date.getDay();

      return weekDay;
    },
    setTimeLine(days, monthName, month, year) {
      let data = [];

      days.forEach(day => {
        const weekDay = this.getDayOfWeek(day, monthName, year);
        
        let obj = {}

        switch (weekDay) {
          case 0:
            obj.date = day + '/' + month;
            obj.weekDay = 'Domingo';
            data.push(obj);
            break;
          
          case 3:
            obj.date = day + '/' + month;
            obj.weekDay = 'Quarta';
            data.push(obj);
            break;

          case 6:
            obj.date = day + '/' + month;
            obj.weekDay = 'Sábado';
            data.push(obj);
            break;
        
          default:
            break;
        }        
      });

      this.tlData = data;
    },
    handleEdit(item) {
      this.showModal = true;
      this.item = item;
    },
    handleConfirm() {
      this.item.preacher = this.preacher;
      this.showModal = false;
      this.preacher = null;
      this.item = null;
    },
    handleSave() {
      console.log('Salvar no BD', this.tlData);
    }
  },
  created () {
    this.loadData();
    console.log(this.tlData);
  },
}
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