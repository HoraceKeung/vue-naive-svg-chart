<template>
	<div :class="isMobile?'text-primary':'text-success'">HELLO</div>
</template>

<script>
export default {
	mounted () {
		this.$nextTick(() => {
			this.checkIsMobile()
		})
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
