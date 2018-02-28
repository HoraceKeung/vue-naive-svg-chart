<template>
	<g>
		<axes v-bind="propsObj" />
		<transition :enter-active-class="propsObj.animateClass"><g v-show="propsObj.inView">
			<slot />
		</g></transition>
		<pop-up v-bind="propsObj" @hover="handleHover" />
	</g>
</template>

<script>
import Axes from './Axes.vue'
import PopUp from './PopUp.vue'
export default {
	props: ['propsObj'],
	components: {Axes, PopUp},
	methods: {
		handleHover (val) {
			this.$emit('hover', val)
		}
	}
}
</script>
