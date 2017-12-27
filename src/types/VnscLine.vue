<template>
	<g>
		<axes :fontSize="fontSize" :padding="padding" :labels="labels" :color="color" :axesStrokeWidth="axesStrokeWidth" :innerWidth="innerWidth" :innerHeight="innerHeight" :yAxisSpace="yAxisSpace" :xAxisSpace="xAxisSpace" :max="max" :yStepSize="yStepSize" :needRotateLabel="needRotateLabel" />
		<g v-for="l in lines">
			<polyline :points="l.linePoints" :style="'fill: none; stroke: '+l.color+'; stroke-width: 2;'" />
			<circle v-for="(p,index) in l.points" :cx="p.x" :cy="p.y" :r="circleR" :style="'fill: #fff; stroke: '+l.color+'; stroke-width: '+circleR/2+';'" />
		</g>
	</g>
</template>

<script>
import mixin from '../mixin.js'
export default {
	name: 'VnscLine',
	mixins: [mixin.lineAndCol],
	methods: {
		calX (index) {
			return (this.innerWidth / this.labels.length) * (index + 0.5) + this.padding + this.yAxisSpace
		},
		calY (d) {
			return this.padding + this.innerHeight * (1 - (d / this.max))
		}
	},
	computed: {
		lines () {
			return this.dataset.map(line => {
				return {
					color: line.color,
					label: line.label,
					points: line.data.map((d, index) => {
						return {
							val: d,
							x: this.calX(index),
							y: this.calY(d)
						}
					}),
					linePoints: line.data.map((d, index) => {
						return this.calX(index) + ',' + this.calY(d)
					}).join(' ')
				}
			})
		},
		circleR () { return Math.min(Math.max(this.innerWidth / this.labels.length / 10, 4), this.fontSize / 2) }
	}
}
</script>

<style scoped>
</style>
