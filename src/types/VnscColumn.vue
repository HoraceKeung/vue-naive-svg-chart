<template>
	<g>
		<axes :fontSize="fontSize" :padding="padding" :labels="labels" :color="color" :axesStrokeWidth="axesStrokeWidth" :innerWidth="innerWidth" :innerHeight="innerHeight" :yAxisSpace="yAxisSpace" :xAxisSpace="xAxisSpace" :max="max" :min="min" :yStepSize="yStepSize" :needRotateLabel="needRotateLabel" />
		<g v-for="c in columns" :fill="c.color">
			<rect v-for="(r,index) in c.rect" :x="r.x" :y="r.y" :width="r.width" :height="r.height" :style="'opacity: '+(index===hovered?'0.6':'1')+';'" />
		</g>
		<pop-up :dataset="dataset" :labels="labels" :innerWidth="innerWidth" :padding="padding" :yAxisSpace="yAxisSpace" :xAxisSpace="xAxisSpace" :innerHeight="innerHeight" :fontSize="fontSize" :hovered.sync="hovered" />
	</g>
</template>

<script>
import mixin from '../mixin.js'
export default {
	name: 'VnscColumn',
	mixins: [mixin.generic, mixin.lineAndCol],
	methods: {
		calH (d) { return this.innerHeight * (Math.abs(d) / (this.max - this.min)) },
		calY (d, index, i) {
			if (this.stack) {
				return this.padding + this.innerHeight - this.calH(d) - this.cumulativeH(index, i)
			} else {
				return this.padding + this.innerHeight * (this.max - (d > 0 ? d : 0)) / (this.max - this.min)
			}
		},
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
					y: this.calY(data[i], index, i),
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
