import _ from 'lodash'
import Axes from './parts/Axes.vue'

const mixin = {
	lineAndCol: {
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
			}
		},
		computed: {
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
}

export default mixin
