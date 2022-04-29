<template>
    <div class="timeline">
        <div class="wrapper left">
            <div class="content">
                <p class="description text-light text-thin">Pregador</p>
                <span class="sub-title">David Freitas</span>
                <p class="description text-primary">15/03</p>
                <div class="options" @click="handleEdit">:</div>
            </div>
        </div>
        <div class="wrapper right">
            <div class="content">
                <p class="description text-light text-thin">Pregador</p>
                <span class="sub-title">Alberto Marques</span>
                <p class="description text-primary">20/03</p>
                <div class="options" @click="handleEdit">:</div>
            </div>
        </div>
        <div class="wrapper left">
            <div class="content">
                <p class="description text-light text-thin">Pregador</p>
                <span class="sub-title">Celso Bezerra</span>
                <p class="description text-primary">05/04</p>
                <div class="options" @click="handleEdit">:</div>
            </div>
        </div>
        <div class="wrapper right">
            <div class="content">
                <p class="description text-light text-thin">Pregador</p>
                <span class="sub-title">Wesley Oliveira</span>
                <p class="description text-primary">10/04</p>
                <div class="options" @click="handleEdit">:</div>
            </div>
        </div>
    </div>
    <ion-modal :is-open="showModal" :breakpoints="[0, 0.2, 0.5, 1]" :initialBreakpoint="0.5">
      <ion-content>
          <div class="modal-content">
              <p class="description text-light">Nome do pregador:</p>
              <input type="text" class="form-input" />
              <button class="btn-large bg-success">Salvar</button>
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
      showModal: false
    }
  },
  methods: {
    handleEdit() {
      this.showModal = true;
    }
  },
}
</script>

<style scoped>
/* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
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