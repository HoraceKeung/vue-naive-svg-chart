import _ from 'lodash'
import Axes from './parts/Axes.vue'
import PopUp from './parts/PopUp.vue'

const mixin = {
	generic: {
		props: ['id', 'type', 'fontSize', 'padding', 'dataset', 'labels', 'showLegend', 'color', 'axesStrokeWidth', 'stack'],
		components: {Axes, PopUp},
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
			dataset (newVal) { this.compute(newVal) },
			stack () { this.compute(this.dataset) }
		},
		data () {
			return {
				biggest: 100,
				max: 100,
				smallest: -100,
				min: -100,
				longestLabelLength: 100,
				innerWidth: 100,
				innerHeight: 100,
				hovered: null
			}
		},
		methods: {
			computeStack (dataset) {
				var output = []
				for (let i = 0; i < dataset.length; i++) {
					for (let j = 0; j < dataset[i].data.length; j++) {
						if (i === 0) { output.push(0) }
						output[j] = output[j] + dataset[i].data[j]
					}
				}
				return output
			},
			genericCompute (dataset) {
				const ele = document.getElementById(this.id)
				this.longestLabelLength = this.labels.map(l => {
					return typeof l === 'string' ? l : l.value
				}).sort((a, b) => { return b.length - a.length })[0].length * 10
				this.innerWidth = ele.getBoundingClientRect().width - (this.padding * 2) - this.yAxisSpace
				this.innerHeight = ele.getBoundingClientRect().height - (this.padding * 2) - this.xAxisSpace
				const tempDataArr = (this.type === 'column' || this.type === 'bar') && this.stack ? this.computeStack(dataset) : _.flatten(dataset.map(d => { return d.data }))
				this.biggest = tempDataArr.reduce((a, b) => { return Math.max(a, b) })
				this.max = Math.ceil(this.biggest / this.stepBaseFactor) * this.stepBaseFactor
				this.smallest = tempDataArr.reduce((a, b) => { return Math.min(a, b) })
				this.min = Math.floor(this.smallest / this.stepBaseFactor) * this.stepBaseFactor
				this.min = this.min > 0 ? 0 : this.min
			}
		},
		computed: {
			stepBaseFactor () {
				let range = this.min >= 0 ? this.max : this.max - this.min
				const tens = 10 ** (range.toString().length - 2)
				switch (range.toString().charAt(0)) {
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
		}
	},
	lineAndCol: {
		methods: {
			compute (dataset) {
				this.genericCompute(dataset)
				this.yStepSize = this.stepBaseFactor
				let range = this.min >= 0 ? this.max : this.max - this.min
				while (this.innerHeight / (range / this.yStepSize) < this.fontSize) {
					this.yStepSize += this.stepBaseFactor
					this.max = Math.ceil(this.biggest / this.yStepSize) * this.yStepSize
					this.min = Math.floor(this.smallest / this.yStepSize) * this.yStepSize
					this.min = this.min > 0 ? 0 : this.min
				}
			}
		},
		computed: {
			yAxisSpace () {
				return Math.max(this.max.toString().length, this.min.toString().length) * 10
			},
			needRotateLabel () {
				return this.longestLabelLength > this.innerWidth / this.labels.length
			},
			xAxisSpace () {
				return this.needRotateLabel ? Math.sqrt((this.longestLabelLength ** 2) / 2) : this.fontSize
			}
		},
		data () {
			return {
				yStepSize: 100
			}
		}
	}
}

export default mixin
