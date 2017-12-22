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
import _ from 'lodash'
import Axes from '../parts/Axes.vue'
export default {
	name: 'VnscLine',
	props: ['id', 'title', 'fontSize', 'padding', 'dataset', 'labels', 'showLegend', 'color', 'axesStrokeWidth'],
	components: {Axes},
	mounted () {
		this.$nextTick(() => {
			this.compute(this.dataset)
			window.addEventListener('resize', _.throttle(() => { this.compute(this.dataset) }, 100))
		})
	},
	beforeDestroy () {
		window.removeEventListener('resize', _.throttle(() => { this.compute(this.dataset) }, 100))
	},
	watch: {
		dataset (newVal) { this.compute(newVal) }
	},
	methods: {
		compute (dataset) {
			const ele = document.getElementById(this.id)
			this.longestLabelLength = this.labels.slice(0).sort((a, b) => { return b.length - a.length })[0].length * 10
			this.innerWidth = ele.getBoundingClientRect().width - (this.padding * 2) - this.yAxisSpace
			this.innerHeight = ele.getBoundingClientRect().height - (this.padding * 2) - this.xAxisSpace
			const biggest = _.flatten(dataset.map(d => { return d.data })).reduce((a, b) => { return Math.max(a, b) })
			this.max = Math.ceil(biggest / this.yStepBaseFactor) * this.yStepBaseFactor
			this.yStepSize = this.yStepBaseFactor
			while (this.innerHeight / (this.max / this.yStepSize) < this.fontSize) {
				this.yStepSize += this.yStepBaseFactor
			}
			this.max = Math.ceil(biggest / this.yStepSize) * this.yStepSize
		},
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
		circleR () { return Math.min(Math.max(this.innerWidth / this.labels.length / 10, 4), this.fontSize / 2) },
		yAxisSpace () {
			return this.max.toString().length * 10
		},
		needRotateLabel () {
			return this.longestLabelLength > this.innerWidth / this.labels.length
		},
		xAxisSpace () {
			return this.needRotateLabel ? Math.sqrt((this.longestLabelLength ** 2) / 2) : this.fontSize
		},
		yStepBaseFactor () {
			const tens = 10 ** (this.max.toString().length - 2)
			switch (this.max.toString().charAt(0)) {
			case '1':
			case '2':
				return 1 * tens
			case '3':
			case '4':
				return 2 * tens
			case '5':
			case '6':
				return 5 * tens
			case '7':
			case '8':
			case '9':
				return 10 * tens
			}
		}
	},
	data () {
		return {
			max: 100,
			yStepSize: 100,
			longestLabelLength: 100,
			innerWidth: 100,
			innerHeight: 100
		}
	}
}
</script>
