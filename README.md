# Introduction
A naive implementation of a few charts with Vue.js. The charts are created using HTML5 SVG.
- [Live Demo](https://horacekeung.github.io/sandbox/vnsc/)

# Installation
```
npm install --save vue-naive-svg-chart
```
or
```
yarn add vue-naive-svg-chart
```
# Usage
In script tag:
```js
import Vnsc from 'vue-naive-svg-chart'
export default {
	components: {Vnsc},
	data () {
		return {
			lineData: [
				{data: [300, 86, 168, 201, 303, 365, 560], color: 'red', label: 'data1'},
				{data: [720, 513, 376, 54, 13, 21, 90], color: 'green', label: 'data2'},
				{data: [560, 319, 62, 75, 807, 497, 641], color: 'blue', label: 'data3'}
			],
			labels: [{
				value: 'Monday',
				popUp: 'Monday (New year)'
			}, 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
		}
	}
}
```
Then in the template:
```
<vnsc id="line-chart-1" type="line" :dataset="lineData" :labels="labels" />
```

## props
```js
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
}
```
- Available chart types are: `'line'`, `'column'`, and `'bar'`.
- `'column'` and `'bar'` charts can be stacked by setting `'stack'` to `'true'`
- Legend can be hidden by setting `'showLegend'` to `'false'`
- `'color'` controls the colour of the axes and legend text
- `'line'` chart can have fill below the line by setting `'lineFill'` to `'solid'` or `'gradient'`
- Pop up can be hidden be setting `'showPopUp'` to `'false'`

## class and id
- Pop up rect has class name of `"id+'-pop-up-rect'"` where `'id'` is the id of the chart
- Line chart data point circle has id of `"id+'-'+l.label+'-data-point-'+index"` where `'id'` is the id of the chart, `'l.label'` is the label for that specific line, and `'index'` is the index of that specific data point in the data array. For example, a line chart with id `'chart1'` and one of the line has label `'line1'`, then the first data point circle will have id of `'chart1-line1-data-point-0'`
