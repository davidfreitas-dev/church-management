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

<style scoped>
/* The actual timeline (the vertical ruler) */
.timeline {
	position: relative;
	max-width: 1200px;
	margin: 1rem auto 3rem auto;
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
	padding: 10px 30px;
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
	right: 20px;
	border: medium solid #fff;
	border-width: 10px 0 10px 10px;
	border-color: transparent transparent transparent #fff;
}

/* Add arrows to the right wrapper (pointing left) */
.right::before {
	content: " ";
	height: 0;
	position: absolute;
	top: 18px;
	width: 0;
	z-index: 1;
	left: 20px;
	border: medium solid #fff;
	border-width: 10px 10px 10px 0;
	border-color: transparent #fff transparent transparent;    
}

/* Fix the circle for wrappers on the right side */
.right::after {
	left: -13px;
}

/* The actual content */
.content {
	position: relative;
	padding: 10px 20px;
	background-color: #fff;
	box-shadow: 5px 5px 25px -5px rgba(0,0,0,0.1);
	position: relative;
	border-radius: 10px;
}

.options {
	position: absolute;
	top: 0;
	right: 0;
	font-size: 1rem;
	font-weight: 700;
	padding: 1rem;
	color: var(--font-light);
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
	.card {
		width: 46.5%;
	}
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
		left: 56px;
		border: medium solid var(--primary);
		border-width: 10px 10px 10px 0;
		border-color: transparent #fff transparent transparent;
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
</style>