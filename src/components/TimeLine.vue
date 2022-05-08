<template>
  <div class="timeline" v-if="timeline.length">
    <template v-for="(event, i) in timeline" :key="i">
      <div class="wrapper" :class="event.position">
        <div class="content">
          <p class="text-light">{{ event.weekDay }}</p>
          <p class="text" v-if="event.name">{{ event.name }}</p>
          <p class="text" v-else>Pendente</p>
          <p class="text-primary text-bold">{{ event.date }}</p>
          <div class="options" @click="$emit('handleClick', i)">
            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { IonIcon } from '@ionic/vue';

export default {
  props: {
    timeline: {
      type: Array,
      require: true
    },
  },
  components: {
    IonIcon,
  },
}
</script>

<style>

</style>