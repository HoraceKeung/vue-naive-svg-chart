<template>
	<component :is="'vnsc-'+type" :title="title" :fontSize="fontSize" :padding="padding" :dataset="dataset" :labels="labels" :showLegend="showLegend"></component>
</template>

<script>
export default {
	components: (() => {
		const context = require.context('./types', false, /\.vue$/)
		return context.keys().map(k => context(k)).reduce((obj, comp) => {
			obj[comp.default.name] = comp.default
			return obj
		}, {})
	})(),
	props: {
		type: {type: String, required: true},
		title: String,
		fontSize: {type: Number, default: 16},
		padding: {type: Number, default: 16},
		dataset: {type: Array, required: true},
		labels: {type: Array, required: true},
		showLegend: {type: Boolean, default: true}
	}
}
</script>

<style scoped>
</style>
