import _ from 'lodash'
import GenericBase from './parts/GenericBase.vue'

const mixin = {
	generic: {
		props: ['id', 'type', 'fontSize', 'padding', 'dataset', 'labels', 'color', 'axesStrokeWidth', 'stack', 'animateClass', 'showPopUp', 'popUpPadding'],
		components: {GenericBase},
		mounted () {
			this.$nextTick(() => {
				this.compute(this.dataset)
				window.addEventListener('resize', _.throttle(() => { this.compute(this.dataset) }, 200))
				this.checkInView()
				window.addEventListener('scroll', _.throttle(() => { this.checkInView() }, 200))
			})
		},
		beforeDestroy () {
			window.removeEventListener('resize', _.throttle(() => { this.compute(this.dataset) }, 200))
			window.removeEventListener('scroll', _.throttle(() => { this.checkInView() }, 200))
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
				hovered: null,
				inView: false
			}
		},
		methods: {
			checkInView () {
				if (!this.inView) {
					const rect = document.getElementById(this.id).getBoundingClientRect()
					if (rect.bottom >= 0 || rect.top <= (window.innerHeight || document.documentElement.clientHeight)) {
						this.inView = true
					}
				}
			},
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
			},
			handleHover (val) {
				this.hovered = val
			}
		},
		computed: {
			propsObj () {
				return {
					id: this.id,
					type: this.type,
					fontSize: this.fontSize,
					padding: this.padding,
					dataset: this.dataset,
					labels: this.labels,
					color: this.color,
					axesStrokeWidth: this.axesStrokeWidth,
					animateClass: this.animateClass,
					innerWidth: this.innerWidth,
					innerHeight: this.innerHeight,
					yAxisSpace: this.yAxisSpace,
					xAxisSpace: this.xAxisSpace,
					hovered: this.hovered,
					max: this.max,
					min: this.min,
					yStepSize: this.yStepSize,
					xStepSize: this.xStepSize,
					needRotateLabel: this.needRotateLabel,
					inView: this.inView,
					showPopUp: this.showPopUp,
					popUpPadding: this.popUpPadding
				}
			},
			needRotateLabel () {
				return this.type === 'bar' ? false : this.longestLabelLength > this.innerWidth / this.labels.length
			},
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
				while (this.innerHeight / (range / this.yStepSize) < this.fontSize * 2) {
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
