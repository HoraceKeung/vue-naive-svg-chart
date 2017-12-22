<template>
	<div class="chartCont" :id="id"><div>
		<svg>
			<component :is="'vnsc-'+type" :id="id" :title="title" :fontSize="fontSize" :padding="padding" :dataset="dataset" :labels="labels" :showLegend="showLegend" :color="color" :axesStrokeWidth="axesStrokeWidth"></component>
		</svg>
	</div></div>
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
		id: {type: String, required: true},
		type: {type: String, required: true},
		title: String,
		fontSize: {type: Number, default: 16},
		padding: {type: Number, default: 16},
		dataset: {type: Array, required: true},
		labels: {type: Array, required: true},
		showLegend: {type: Boolean, default: true},
		color: {type: String, default: '#000'},
		axesStrokeWidth: {type: Number, default: 2}
	}
}
</script>

<style scoped>
.chartCont {
	padding-top: 56.25%;
	position: relative;
}
.chartCont > div {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}
.chartCont svg {
	width: 100%;
	height: 100%;
}
</style>
