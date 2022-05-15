<template>
  <ion-page>
    <header-top :title="pageTitle" :action="true" @handleClick="handleNew"></header-top>
    
    <ion-content :fullscreen="true">
      <div class="container">
        <div class="description text-center text-light" v-if="!preachers">
          Clique em NOVO para inserir um contato
        </div>

        <div class="list" v-else>
          <div class="list-item" v-for="(preacher, id) in preachers" :key="id">
            <div class="list-content">
              <a class="btn-icon bg-success" target="_blank" :href="`https://api.whatsapp.com/send?1=pt_BR&amp;phone=55${preacher.contact}&amp;text=Olá,%20${preacher.name}`">
                <ion-icon name="logo-whatsapp"></ion-icon>
              </a>
              <div class="list-desc">
                <span class="text">{{ preacher.name }}</span>
                <span class="text text-grey text-thin">{{ preacher.from }}</span>
              </div>
            </div>
            <div class="list-action" @click="handleEdit(id)">              
              <ion-icon name="ellipsis-vertical-outline"></ion-icon>
            </div>
          </div>
        </div>

        <ion-modal :is-open="showModal" :breakpoints="[0, 0.99, 1]" :initialBreakpoint="0.99">
          <ion-content>
            <div class="modal-header">
              <span @click="handleCancel">Fechar</span>
            </div>
            
            <div class="modal-content">
              <p class="text-light">Nome do pregador:</p>
              <input type="text" class="form-input" v-model="preacher.name" @keyup.enter="$event.target.nextElementSibling.focus()"/>              
              
              <p class="text-light">Igreja:</p>
              <input type="text" class="form-input" v-model="preacher.from" @keyup.enter="$event.target.nextElementSibling.focus()"/>
              
              <p class="text-light">Telefone:</p>
              <input type="number" class="form-input" v-model="preacher.contact" @keyup.enter="handleSave"/>
              
              <div class="modal-actions">
                <button class="btn btn-full bg-primary" @click="handleSave">Salvar</button>
                <button class="btn btn-full bg-danger" @click="handleDelete" v-if="preacherId">Excluir</button>
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
          self.preachers = response.data ? response.data : null;
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

      this.preacher.name = this.preacher.name.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
      this.preacher.from = this.preacher.from.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });

      const preacher = { ...this.preacher };

      await this.$axios[method](url, preacher)
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
      const id = this.preacherId;
      
      await this.$axios.delete(`/preachers-list/${id}.json`)
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

</style>