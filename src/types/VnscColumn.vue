<template>
	<g>
		<axes :fontSize="fontSize" :padding="padding" :labels="labels" :color="color" :axesStrokeWidth="axesStrokeWidth" :innerWidth="innerWidth" :innerHeight="innerHeight" :yAxisSpace="yAxisSpace" :xAxisSpace="xAxisSpace" :max="max" :yStepSize="yStepSize" :needRotateLabel="needRotateLabel" />
		<g v-for="c in columns" :fill="c.color">
			<rect v-for="r in c.rect" :x="r.x" :y="r.y" :width="r.width" :height="r.height" />
		</g>
	</g>
</template>

<script>
import mixin from '../mixin.js'
export default {
	name: 'VnscColumn',
	mixins: [mixin.lineAndCol],
	computed: {
		columns () {
			const colWidth = this.innerWidth / this.labels.length / (this.dataset.length + 1)
			return this.dataset.map((col, i1) => {
				return {
					color: col.color,
					label: col.label,
					rect: col.data.map((d, i2) => {
						return {
							val: d,
							x: this.padding + this.yAxisSpace + (this.innerWidth / this.labels.length * i2) + (colWidth * i1) + (colWidth / 2),
							y: this.padding + this.innerHeight * (1 - (d / this.max)),
							width: colWidth,
							height: this.innerHeight * (d / this.max)
						}
					})
				}
			})
		}
	}
}
</script>

<style scoped>
</style>
