<template>
  <ion-page>
    <header-top :title="pageTitle" :back-route="backRoute" :right-button-name="'Novo'"
      :left-button="true" :right-button="true" @handleClick="handleNew"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <p class="description text-center text-light" v-if="!preachers">Nenhum pregador encontrado</p>

        <div class="list" v-if="preachers">
          <div class="list-item" v-for="(preacher, id) in preachers" :key="id">
            <div class="list-content">
              <button class="btn-icon bg-primary" @click="handleEdit(id)">
                <ion-icon name="person"></ion-icon>
              </button><br />
              <div class="list-desc">
                <span class="sub-title">{{ preacher.name }}</span>
                <span class="description">{{ preacher.from }}</span>
              </div>
            </div>
            <div class="list-action">
              <a target="_blank" :href="`https://api.whatsapp.com/send?1=pt_BR&amp;phone=55${preacher.contact}&amp;text=Olá,%20${preacher.name}`">
                <ion-icon name="logo-whatsapp"></ion-icon>
              </a>
            </div>
          </div>
        </div>

        <ion-modal :is-open="showModal" :breakpoints="[0, 0.2, 0.5, 1]" :initialBreakpoint="0.9">
          <ion-content>
            <div class="modal-content">
              <p class="description text-light">Nome do pregador:</p>
              <input type="text" class="form-input" v-model="preacher.name" @keyup.enter="$event.target.nextElementSibling.focus()"/>              
              <p class="description text-light">Igreja:</p>
              <input type="text" class="form-input" v-model="preacher.from" @keyup.enter="$event.target.nextElementSibling.focus()"/>
              <p class="description text-light">Telefone:</p>
              <input type="text" class="form-input" v-model="preacher.contact" @keyup.enter="handleSave"/>
              
              <div class="modal-actions">
                <button class="btn-large bg-success" @click="handleSave">Salvar</button>
                <button class="btn-large bg-danger" @click="handleDelete" v-if="preacherId">Excluir</button>
                <button class="btn-link" @click="handleCancel">Cancelar</button>
              </div>
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
import { IonContent, IonPage, IonIcon, IonModal } from '@ionic/vue';
import HeaderTop from '@/components/HeaderTop.vue';
import LoaderBox from '@/components/LoaderBox.vue';
import ToastMessage from '@/components/ToastMessage.vue';

export default ({
  name: 'PreachersList',
  components: { IonContent, IonPage, IonIcon, IonModal, HeaderTop, LoaderBox, ToastMessage },
  data() {
    return {
      pageTitle: 'Pregadores',
      backRoute: '/ancient',
      preachers: null,
      preacherId: null,
      preacher: { name: null, from: null, contact: null },
      showModal: false,
      toastData: {}
    }
  },
  methods: {
    async loadData() {
      const self = this;

      await this.$axios.get('preachers-list.json')
        .then(async function(response) {          
          if (response.data) {
            self.preachers = response.data;
          }
        })
        .catch(error => {
          self.handleToast('danger', 'Erro ao carregar os dados: ' + error);
        });
    },
    handleNew() {
      this.showModal = true;
    },
    handleEdit(id) {
      this.preacherId = id;
      this.preacher = { ...this.preachers[id] };
      this.showModal = true;
    },
    async handleSave() {
      const self = this;
      const preacherId = this.preacherId;

      const method = preacherId ? 'patch' : 'post';
      const url = preacherId 
        ? `preachers-list/${preacherId}.json` 
        : 'preachers-list.json';

      this.$refs.loader.setOpen(true);

      const preacher = { ...this.preacher };

      await this.$axios[method](url, preacher)
        .then(async function(response) {
          if (response.data) {
            self.showModal = false;
            self.handleToast('success', 'Salvo com sucesso!');
            self.loadData();
            self.handleClear();            
          }
        })
        .catch(error => {
          self.handleToast('danger', 'Erro ao salvar os dados: ' + error);
        })
        .finally(() => {
          self.$refs.loader.setOpen(false);
        });
    },
    async handleDelete() {
      this.$refs.loader.setOpen(true);

      const self = this;
      const id = this.preacherId;
      
      await this.$axios.delete(`/preachers-list/${id}.json`)
        .then(async function(response) {    
          if (!response.data) {
            self.showModal = false;
            self.handleToast('success', 'Excluído com sucesso!');
            self.loadData();
            self.handleClear(); 
          }
        })
        .catch(error => {
          self.handleToast('danger', 'Erro ao carregar os dados: ' + error);
        })
        .finally(() => {
          self.$refs.loader.setOpen(false);
        });
    },
    handleClear() {
      this.preacherId = null;
      this.preacher = { name: null, from: null, contact: null };
    },
    handleCancel() {
      this.showModal = false;
      this.handleClear();
    },
    handleToast(color, message) {
      this.toastData = { 
        color: color,
        message: message
      };

      this.$refs.toast.setOpen(true);
    },    
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
/* Place the timeline to the left */
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

.modal-actions {
  width: 100%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>