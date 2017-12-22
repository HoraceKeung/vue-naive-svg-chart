<template>
	<g>
		<polyline :points="axisPoints" :style="'fill: none; stroke: '+color+'; stroke-width: '+axesStrokeWidth+';'" />
		<text v-for="n in (ySteps+1)" :fill="color" text-anchor="end" :x="yAxisSpace+(padding*3/4)-axesStrokeWidth" :y="innerHeight+padding-(innerHeight*(n-1)/ySteps)+fontSize/2">{{(n-1)*yStepSize}}</text>
		<line v-for="n in ySteps" :x1="padding+yAxisSpace" :y1="innerHeight+padding-(innerHeight*n/ySteps)" :x2="innerWidth+yAxisSpace+padding" :y2="innerHeight+padding-(innerHeight*n/ySteps)" :style="'stroke: '+color+'; opacity: 0.35;'"/>
		<text v-for="(l,index) in computedLabel" :fill="color" :text-anchor="needRotateLabel?'end':'middle'" :x="l.x" :y="l.y" :transform="l.r">{{index%xStepSize===0?l.val:''}}</text>
	</g>
</template>

<script>
export default {
	props: ['fontSize', 'padding', 'labels', 'color', 'axesStrokeWidth', 'innerWidth', 'innerHeight', 'yAxisSpace', 'xAxisSpace', 'max', 'yStepSize', 'needRotateLabel'],
	computed: {
		axisPoints () {
			const baseX = this.padding + this.yAxisSpace - this.axesStrokeWidth
			const baseY = this.innerHeight + this.padding + this.axesStrokeWidth
			return baseX + ',' + this.padding + ' ' + baseX + ',' + baseY + ' ' + (baseX + this.innerWidth) + ',' + baseY
		},
		ySteps () {
			return this.max / this.yStepSize
		},
		computedLabel () {
			return this.labels.map((l, index) => {
				const x = this.yAxisSpace + this.padding + ((index + 0.5) * this.innerWidth / this.labels.length)
				const y = this.innerHeight + this.padding + this.axesStrokeWidth + (this.needRotateLabel ? 10 : this.xAxisSpace)
				return {val: l, x, y, r: 'rotate(' + (this.needRotateLabel ? '-45' : '0') + ',' + x + ', ' + y + ')'}
			})
		},
		xStepSize () {
			if (this.needRotateLabel && (this.innerWidth / this.labels.length) < this.fontSize * 2) {
				return Math.ceil(this.fontSize * 2 / (this.innerWidth / this.labels.length))
			} else { return 1 }
		}
	}
}
</script>
