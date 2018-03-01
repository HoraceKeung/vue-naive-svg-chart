<template>
	<div>
		<div v-if="showLegend" class="legend">
			<ul>
				<li v-for="(d,index) in dataset" @click="toggleLegend(index)" :style="'opacity: '+(filterIndex.includes(index)?'0.25':'1')+';'">
					<label :style="'background-color: '+d.color+'; margin: auto '+fontSize/2+'px; width: '+fontSize+'px; height: '+fontSize+'px; border-radius: '+fontSize/4+'px;'" />
					<span :style="'color: '+color+';'">{{d.label}}</span>
				</li>
			</ul>
		</div>
		<div class="chartCont" :id="id"><div>
			<svg>
				<component :is="'vnsc-'+type" :id="id" :type="type" :fontSize="fontSize" :padding="padding" :dataset="computedDataset" :labels="labels"
				:color="color" :axesStrokeWidth="axesStrokeWidth" :stack="stack" :lineFill="lineFill" :lineFillOpacity="lineFillOpacity" :animateClass="animateClass"
				:showPopUp="showPopUp" :popUpPadding="popUpPadding"></component>
			</svg>
		</div></div>
	</div>
</template>

<script>
export default {
	components: (() => {
		const context = require.context('./types', false, /\.vue$/)
		return context.keys().map(k => context(k)).reduce((obj, comp) => {
			obj[comp.name] = comp
			return obj
		}, {})
	})(),
	props: {
		id: {type: String, required: true},
		type: {type: String, required: true},
		fontSize: {type: Number, default: 16},
		padding: {type: Number, default: 16},
		dataset: {type: Array, required: true},
		labels: {type: Array, required: true},
		showLegend: {type: Boolean, default: true},
		color: {type: String, default: '#000'},
		axesStrokeWidth: {type: Number, default: 2},
		stack: {type: Boolean, default: false},
		lineFill: {type: String, default: 'none'},
		lineFillOpacity: {type: Number, default: 0.6},
		animateClass: {type: String},
		showPopUp: {type: Boolean, default: true},
		popUpPadding: {type: Number, default: 16}
	},
	computed: {
		computedDataset () {
			return this.dataset.filter((d, index) => {
				return !this.filterIndex.includes(index)
			})
		}
	},
	data () {
		return {
			filterIndex: []
		}
	},
	methods: {
		toggleLegend (index) {
			const i = this.filterIndex.indexOf(index)
			if (i >= 0) {
				this.filterIndex.splice(i, 1)
			} else if (this.filterIndex.length !== this.dataset.length - 1) {
				this.filterIndex.push(index)
			}
		}
	}
}
</script>

<style scoped>
.legend {
	text-align: center;
}
.legend ul {
	list-style-type: none;
	margin: 0;
}
.legend li {
	display: inline-flex;
	margin: 0 10px;
	cursor: pointer;
}
.legend label {
	cursor: pointer;
}
.chartCont {
	padding-top: 56.25%;
	position: relative;
}
.chartCont > div {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}
.chartCont svg {
	width: 100%;
	height: 100%;
}
</style>
