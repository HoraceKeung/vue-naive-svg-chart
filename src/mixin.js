import _ from 'lodash'
import Axes from './parts/Axes.vue'
import PopUp from '~/components/parts/PopUp.vue'

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
				this.longestLabelLength = this.labels.slice(0).sort((a, b) => { return b.length - a.length })[0].length * 10
				this.innerWidth = ele.getBoundingClientRect().width - (this.padding * 2) - this.yAxisSpace
				this.innerHeight = ele.getBoundingClientRect().height - (this.padding * 2) - this.xAxisSpace
				const tempDataArr = (this.type === 'column' || this.type === 'bar') && this.stack ? this.computeStack(dataset) : _.flatten(dataset.map(d => { return d.data }))
				this.biggest = tempDataArr.reduce((a, b) => { return Math.max(a, b) })
				this.max = Math.ceil(this.biggest / this.stepBaseFactor) * this.stepBaseFactor
			}
		},
		computed: {
			stepBaseFactor () {
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
		}
	},
	lineAndCol: {
		methods: {
			compute (dataset) {
				this.genericCompute(dataset)
				this.yStepSize = this.stepBaseFactor
				while (this.innerHeight / (this.max / this.yStepSize) < this.fontSize) {
					this.yStepSize += this.stepBaseFactor
				}
				this.max = Math.ceil(this.biggest / this.yStepSize) * this.yStepSize
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
