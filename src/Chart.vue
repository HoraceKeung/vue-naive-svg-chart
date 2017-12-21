<template>
	<div :class="isMobile?'text-primary':'text-success'">HELLO</div>
</template>

<script>
import _ from 'lodash'
export default {
	mounted () {
		this.$nextTick(() => {
			this.checkIsMobile()
			window.addEventListener('resize', _.throttle(() => {
				this.checkIsMobile()
			}, 100))
		})
	},
	beforeDestroy () {
		window.removeEventListener('resize', _.throttle(() => {
			this.checkIsMobile()
		}, 100))
	},
	methods: {
		checkIsMobile () {
			this.isMobile = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) <= 767
		}
	},
	data () {
		return {
			isMobile: false
		}
	}
}
</script>
