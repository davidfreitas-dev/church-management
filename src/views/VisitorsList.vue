<template>
  <ion-page>
    <header-top :title="pageTitle" :back-route="backRoute" :right-button-name="'Novo'"
      :left-button="true" :right-button="true" @handleClick="handleNew"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <div class="description text-center text-light" v-if="!visitors">
          Clique em NOVO para inserir um contato
        </div>

        <div class="list" v-else>
          <div class="list-item" v-for="(visitor, id) in visitors" :key="id">
            <div class="list-content">
              <a class="btn-icon bg-success" target="_blank" :href="`https://api.whatsapp.com/send?1=pt_BR&amp;phone=55${visitor.contact}&amp;text=Olá,%20${visitor.name}`">
                <ion-icon name="logo-whatsapp"></ion-icon>
              </a>
              <div class="list-desc">
                <span class="sub-title">{{ visitor.name }}</span>
                <span class="description">{{ visitor.contact }}</span>
              </div>
            </div>
            <div class="list-action" @click="handleEdit(id)">              
              <ion-icon name="ellipsis-vertical-outline"></ion-icon>
            </div>
          </div>
        </div>

        <ion-modal :is-open="showModal" :breakpoints="[0, 0.2, 0.8, 1]" :initialBreakpoint="0.8">
          <ion-content>
            <div class="modal-content">
              <p class="description text-light">Nome:</p>
              <input type="text" class="form-input" v-model="visitor.name" @keyup.enter="$event.target.nextElementSibling.focus()"/>
              <p class="description text-light">Telefone:</p>
              <input type="text" class="form-input" v-model="visitor.contact" @keyup.enter="handleSave"/>
              
              <div class="modal-actions">
                <button class="btn-large bg-success" @click="handleSave">Salvar</button>
                <button class="btn-large bg-danger" @click="handleDelete" v-if="visitorId">Excluir</button>
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
  name: 'VisitorsList',
  components: { IonContent, IonPage, IonIcon, IonModal, HeaderTop, LoaderBox, ToastMessage },
  data() {
    return {
      pageTitle: 'Visitantes',
      backRoute: '/reception',
      visitors: null,
      visitorId: null,
      visitor: { name: null, contact: null },
      showModal: false,
      toastData: {}
    }
  },
  methods: {
    async loadData() {
      const self = this;

      await this.$axios.get('visitors-list.json')
        .then(async function(response) {
          self.visitors = response.data ? response.data : null;
        })
        .catch(error => {
          self.handleToast('danger', 'Erro ao carregar os dados: ' + error);
        });
    },
    handleNew() {
      this.showModal = true;
    },
    handleEdit(id) {
      this.visitorId = id;
      this.visitor = { ...this.visitors[id] };
      this.showModal = true;
    },
    async handleSave() {
      const self = this;
      const visitorId = this.visitorId;

      const method = visitorId ? 'patch' : 'post';
      const url = visitorId 
        ? `visitors-list/${visitorId}.json` 
        : 'visitors-list.json';

      this.$refs.loader.setOpen(true);

      const visitor = { ...this.visitor };

      await this.$axios[method](url, visitor)
        .then(async function(response) {
          if (response.data) {
            self.showModal = false;

            self.handleToast('success', 'Salvo com sucesso!');
            self.handleClear();
            
            setTimeout(() => {
              self.loadData();
            }, 500);
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
      const id = this.visitorId;
      
      await this.$axios.delete(`/visitors-list/${id}.json`)
        .then(async function(response) {    
          if (!response.data) {
            self.showModal = false;
            
            self.handleToast('success', 'Excluído com sucesso!');
            self.handleClear();
            
            setTimeout(() => {
              self.loadData();
            }, 500);
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
      this.visitorId = null;
      this.visitor = { name: null, contact: null };
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