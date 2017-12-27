<template>
	<g>
		<polyline :points="axisPoints" :style="'fill: none; stroke: '+color+'; stroke-width: '+axesStrokeWidth+';'" />
		<g v-if="yStepSize">
			<text v-for="n in (ySteps+1)" :fill="color" text-anchor="end" :x="yAxisSpace+(padding*3/4)-axesStrokeWidth" :y="innerHeight+padding-(innerHeight*(n-1)/ySteps)+fontSize/2">{{(n-1)*yStepSize}}</text>
			<line v-for="n in ySteps" :x1="padding+yAxisSpace" :y1="innerHeight+padding-(innerHeight*n/ySteps)" :x2="innerWidth+yAxisSpace+padding" :y2="innerHeight+padding-(innerHeight*n/ySteps)" :style="'stroke: '+color+'; opacity: 0.35;'"/>
		</g>
		<g v-else>
			<text v-for="n in xSteps" text-anchor="middle" :fill="color" :x="yAxisSpace+(padding*3/4)-axesStrokeWidth+((n-1)*innerWidth/xSteps)" :y="innerHeight+padding+axesStrokeWidth+xAxisSpace">{{(n-1)*computedXStepSize}}</text>
			<line v-for="n in xSteps" :x1="yAxisSpace+padding-axesStrokeWidth+(n*innerWidth/xSteps)" :y1="padding" :x2="yAxisSpace+padding-axesStrokeWidth+(n*innerWidth/xSteps)" :y2="innerHeight+padding" :style="'stroke: '+color+'; opacity: 0.35;'"/>
		</g>
		<text v-for="(l,index) in computedLabel" :fill="color" :text-anchor="needRotateLabel||!yStepSize?'end':'middle'" :x="l.x" :y="l.y" :transform="l.r">{{index%computedXStepSize===0||!yStepSize?l.val:''}}</text>
	</g>
</template>

<script>
export default {
	props: ['fontSize', 'padding', 'labels', 'color', 'axesStrokeWidth', 'innerWidth', 'innerHeight', 'yAxisSpace', 'xAxisSpace', 'max', 'yStepSize', 'xStepSize', 'needRotateLabel'],
	computed: {
		axisPoints () {
			const baseX = this.padding + this.yAxisSpace + this.axesStrokeWidth / 2
			const baseY = this.innerHeight + this.padding + this.axesStrokeWidth / 2
			return baseX + ',' + this.padding + ' ' + baseX + ',' + baseY + ' ' + (baseX + this.innerWidth) + ',' + baseY
		},
		ySteps () {
			return this.max / this.yStepSize
		},
		xSteps () {
			return this.max / this.computedXStepSize
		},
		computedLabel () {
			return this.labels.map((l, index) => {
				const x = this.yStepSize ? this.yAxisSpace + this.padding + ((index + 0.5) * this.innerWidth / this.labels.length) : this.yAxisSpace + this.padding * 3 / 4
				const y = this.yStepSize ? this.innerHeight + this.padding + this.axesStrokeWidth + (this.needRotateLabel ? 10 : this.xAxisSpace) : (index + 0.5) * this.innerHeight / this.labels.length + this.fontSize / 2 + this.padding
				return {val: l, x, y, r: 'rotate(' + (this.needRotateLabel ? '-45' : '0') + ',' + x + ', ' + y + ')'}
			})
		},
		computedXStepSize () {
			return this.yStepSize ? ((this.needRotateLabel && (this.innerWidth / this.labels.length) < this.fontSize * 2) ? Math.ceil(this.fontSize * 2 / (this.innerWidth / this.labels.length)) : 1) : this.xStepSize
		}
	}
}
</script>
