<template>
	<g>
		<axes :fontSize="fontSize" :padding="padding" :labels="labels" :color="color" :axesStrokeWidth="axesStrokeWidth" :innerWidth="innerWidth" :innerHeight="innerHeight" :yAxisSpace="yAxisSpace" :xAxisSpace="xAxisSpace" :max="max" :min="min" :xStepSize="xStepSize" :needRotateLabel="false" />
		<g v-for="b in bars" :fill="b.color">
			<rect v-for="(r,index) in b.rect" :x="r.x" :y="r.y" :width="r.width" :height="r.height" :style="'opacity: '+(index===hovered?'0.6':'1')+';'" />
		</g>
		<pop-up :id="id" :dataset="dataset" :labels="labels" :innerWidth="innerWidth" :padding="padding" :yAxisSpace="yAxisSpace" :xAxisSpace="xAxisSpace" :innerHeight="innerHeight" :fontSize="fontSize" :type="type" :hovered.sync="hovered" />
	</g>
</template>

<script>
import mixin from '../mixin.js'
export default {
	name: 'VnscBar',
	mixins: [mixin.generic],
	methods: {
		compute (dataset) {
			this.genericCompute(dataset)
			this.xStepSize = this.stepBaseFactor
			while (this.innerWidth / ((this.max - this.min) / this.xStepSize) < Math.max(this.max.toString().length, this.min.toString().length) * 10) {
				this.xStepSize += this.stepBaseFactor
				this.max = Math.ceil(this.biggest / this.xStepSize) * this.xStepSize
				this.min = Math.floor(this.smallest / this.xStepSize) * this.xStepSize
				this.min = this.min > 0 ? 0 : this.min
			}
		},
		calW (d) { return this.innerWidth * (Math.abs(d) / (this.max - this.min)) },
		calX (d, index, i) {
			if (this.stack) {
				return this.padding + this.yAxisSpace + this.cumulativeW(index, i)
			} else {
				return this.padding + this.yAxisSpace + this.innerWidth * (Math.abs(this.min) - (d > 0 ? 0 : Math.abs(d))) / (this.max - this.min)
			}
		},
		cumulativeW (index, i) {
			let output = 0
			for (let j = 0; j < index; j++) {
				output += this.calW(this.dataset[j].data[i])
			}
			return output
		},
		computeRect (data, index) {
			const barHeight = this.innerHeight / this.labels.length / (this.stack ? 2 : this.dataset.length + 1)
			var output = []
			for (let i = 0; i < data.length; i++) {
				output.push({
					val: data[i],
					x: this.calX(data[i], index, i),
					y: this.padding + (this.innerHeight / this.labels.length * i) + (this.stack ? 0 : barHeight * index) + barHeight / 2,
					width: this.calW(data[i]),
					height: barHeight
				})
			}
			return output
		}
	},
	computed: {
		yAxisSpace () {
			return this.longestLabelLength
		},
		xAxisSpace () {
			return this.fontSize
		},
		bars () {
			return this.dataset.map((bar, index) => {
				return {
					color: bar.color,
					label: bar.label,
					rect: this.computeRect(bar.data, index)
				}
			})
		}
	},
	data () {
		return {
			xStepSize: 100
		}
	}
}
</script>

<style scoped>
</style>
