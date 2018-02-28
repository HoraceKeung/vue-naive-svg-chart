<template>
	<g>
		<polyline :points="axisPoints" :style="'fill: none; stroke: '+color+'; stroke-width: '+axesStrokeWidth+';'" />
		<g v-if="type==='bar'">
			<text v-for="n in xSteps" text-anchor="middle" :fill="color" :x="yAxisSpace+(padding*3/4)+((n-1)*innerWidth/xSteps)" :y="innerHeight+padding+xAxisSpace">{{(n-1+min/xStepSize)*computedXStepSize}}</text>
			<line v-for="n in (xSteps+1)" :x1="yAxisSpace+padding+((n-1)*innerWidth/xSteps)" :y1="padding" :x2="yAxisSpace+padding+((n-1)*innerWidth/xSteps)" :y2="innerHeight+padding" :style="'stroke: '+color+'; opacity: 0.35;'"/>
		</g>
		<g v-else>
			<text v-for="n in (ySteps+1)" :fill="color" text-anchor="end" :x="yAxisSpace+(padding*3/4)" :y="innerHeight+padding-(innerHeight*(n-1)/ySteps)+fontSize/2">{{(n-1+min/yStepSize)*yStepSize}}</text>
			<line v-for="n in (ySteps+1)" :x1="padding+yAxisSpace" :y1="innerHeight+padding-(innerHeight*(n-1)/ySteps)" :x2="innerWidth+yAxisSpace+padding" :y2="innerHeight+padding-(innerHeight*(n-1)/ySteps)" :style="'stroke: '+color+'; opacity: 0.35;'"/>
		</g>
		<text v-for="(l,index) in computedLabel" :fill="color" :text-anchor="needRotateLabel||type==='bar'?'end':'middle'" :x="l.x" :y="l.y" :transform="l.r">{{index%computedXStepSize===0||type==='bar'?l.val:''}}</text>
	</g>
</template>

<script>
export default {
	props: ['fontSize', 'padding', 'labels', 'color', 'axesStrokeWidth', 'innerWidth', 'innerHeight', 'yAxisSpace', 'xAxisSpace', 'max', 'min', 'yStepSize', 'xStepSize', 'needRotateLabel', 'type'],
	computed: {
		axisPoints () {
			const baseX = this.padding + this.yAxisSpace
			const baseY = this.innerHeight + this.padding
			return baseX + ',' + this.padding + ' ' + baseX + ',' + baseY + ' ' + (baseX + this.innerWidth) + ',' + baseY
		},
		ySteps () {
			return Math.ceil((this.max - this.min) / this.yStepSize)
		},
		xSteps () {
			return Math.ceil((this.max - this.min) / this.computedXStepSize)
		},
		computedLabel () {
			return this.labels.map((l, index) => {
				const x = this.type === 'bar' ? this.yAxisSpace + this.padding * 3 / 4 : this.yAxisSpace + this.padding + ((index + 0.5) * this.innerWidth / this.labels.length)
				const y = this.type === 'bar' ? (index + 0.5) * this.innerHeight / this.labels.length + this.fontSize / 2 + this.padding : this.innerHeight + this.padding + 10 + (this.needRotateLabel ? 0 : this.xAxisSpace)
				const val = typeof l === 'string' ? l : l.value
				return {val, x, y, r: 'rotate(' + (this.needRotateLabel ? '-45' : '0') + ',' + x + ', ' + y + ')'}
			})
		},
		computedXStepSize () {
			return this.type === 'bar' ? this.xStepSize : ((this.needRotateLabel && (this.innerWidth / this.labels.length) < this.fontSize * 2) ? Math.ceil(this.fontSize * 2 / (this.innerWidth / this.labels.length)) : 1)
		}
	}
}
</script>
