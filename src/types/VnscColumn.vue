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
	methods: {
		calH (d) { return this.innerHeight * (d / this.max) },
		cumulativeH (index, i) {
			let output = 0
			for (let j = 0; j < index; j++) {
				output += this.calH(this.dataset[j].data[i])
			}
			return output
		},
		computeRect (data, index) {
			const colWidth = this.innerWidth / this.labels.length / (this.stack ? 2 : this.dataset.length + 1)
			var output = []
			for (let i = 0; i < data.length; i++) {
				output.push({
					val: data[i],
					x: this.padding + this.yAxisSpace + (this.innerWidth / this.labels.length * i) + (this.stack ? 0 : colWidth * index) + colWidth / 2,
					y: this.padding + this.innerHeight - this.calH(data[i]) - (this.stack ? this.cumulativeH(index, i) : 0),
					width: colWidth,
					height: this.calH(data[i])
				})
			}
			return output
		}
	},
	computed: {
		columns () {
			return this.dataset.map((col, index) => {
				return {
					color: col.color,
					label: col.label,
					rect: this.computeRect(col.data, index)
				}
			})
		}
	}
}
</script>

<style scoped>
</style>
