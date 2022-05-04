<template>
  <ion-page>
    <header-top :title="pageTitle" :back-route="backRoute" :right-button-name="'Novo'"
      :left-button="true" :right-button="true" @handleClick="handleNew"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <div class="description text-center text-light" v-if="!singers">
          Clique em NOVO para inserir um contato
        </div>

        <div class="list" v-else>
          <div class="list-item" v-for="(singer, id) in singers" :key="id">
            <div class="list-content">
              <a class="btn-icon bg-success" target="_blank" :href="`https://api.whatsapp.com/send?1=pt_BR&amp;phone=55${singer.contact}&amp;text=Olá,%20${singer.name}`">
                <ion-icon name="logo-whatsapp"></ion-icon>
              </a>
              <div class="list-desc">
                <span class="sub-title">{{ singer.name }}</span>
                <span class="description">{{ singer.from }}</span>
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
              <p class="description text-light">Nome do cantor:</p>
              <input type="text" class="form-input" v-model="singer.name" @keyup.enter="$event.target.nextElementSibling.focus()"/>              
              <p class="description text-light">Igreja:</p>
              <input type="text" class="form-input" v-model="singer.from" @keyup.enter="$event.target.nextElementSibling.focus()"/>
              <p class="description text-light">Telefone:</p>
              <input type="text" class="form-input" v-model="singer.contact" @keyup.enter="handleSave"/>
              
              <div class="modal-actions">
                <button class="btn-large bg-success" @click="handleSave">Salvar</button>
                <button class="btn-large bg-danger" @click="handleDelete" v-if="singerId">Excluir</button>
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
  name: 'SingersList',
  components: { IonContent, IonPage, IonIcon, IonModal, HeaderTop, LoaderBox, ToastMessage },
  data() {
    return {
      pageTitle: 'Cantores',
      backRoute: '/music',
      singers: null,
      singerId: null,
      singer: { name: null, from: null, contact: null },
      showModal: false,
      toastData: {}
    }
  },
  methods: {
    async loadData() {
      const self = this;

      await this.$axios.get('singers-list.json')
        .then(async function(response) {
          self.singers = response.data ? response.data : null;
        })
        .catch(error => {
          self.handleToast('danger', 'Erro ao carregar os dados: ' + error);
        });
    },
    handleNew() {
      this.showModal = true;
    },
    handleEdit(id) {
      this.singerId = id;
      this.singer = { ...this.singers[id] };
      this.showModal = true;
    },
    async handleSave() {
      const self = this;
      const singerId = this.singerId;

      const method = singerId ? 'patch' : 'post';
      const url = singerId 
        ? `singers-list/${singerId}.json` 
        : 'singers-list.json';

      this.$refs.loader.setOpen(true);

      const singer = { ...this.singer };

      await this.$axios[method](url, singer)
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
      const id = this.singerId;
      
      await this.$axios.delete(`/singers-list/${id}.json`)
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
      this.singerId = null;
      this.singer = { name: null, from: null, contact: null };
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