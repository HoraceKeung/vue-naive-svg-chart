<template>
	<g>
		<rect @mousemove="trackMouse($event, index)" @mouseover="$emit('update:hovered', index)" @mouseout="$emit('update:hovered', null)" fill="transparent" v-for="(r,index) in hoverRects" :x="r.x" :y="r.y" :width="r.w" :height="r.h" />
		<g v-if="hovered!==null&&mousePos">
			<line :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2" stroke="rgba(0,0,0,0.6)"/>
			<rect :x="popUp.x" :y="popUp.y" :width="popUp.width" :height="popUp.height" :rx="fontSize/4" :ry="fontSize/4" fill="rgba(0,0,0,0.6)" />
			<text :x="popUp.x+padding/2" :y="popUp.y+fontSize+padding/2" fill="#fff">{{labels[hovered]}}</text>
			<g v-for="(d,index) in dataset">
				<rect :x="popUp.x+padding/2" :y="popUp.y+padding/2+(fontSize+padding/2)*(index+1)" :width="fontSize" :height="fontSize" :fill="d.color" :rx="fontSize/2" :ry="fontSize/2" />
				<text :x="popUp.x+padding/2+fontSize*1.5" :y="popUp.y+(fontSize+padding/2)*(index+2)" fill="#fff">{{d.label+': '+d.data[hovered]}}</text>
			</g>
		</g>
	</g>
</template>

<script>
export default {
	props: ['dataset', 'labels', 'innerWidth', 'padding', 'yAxisSpace', 'xAxisSpace', 'axesStrokeWidth', 'innerHeight', 'fontSize', 'type', 'hovered'],
	computed: {
		line () {
			const X = this.padding + this.yAxisSpace + this.innerWidth / this.labels.length * (this.hovered + 0.5)
			const Y = this.padding + this.innerHeight / this.labels.length * (this.hovered + 0.5)
			return {
				x1: this.type === 'bar' ? this.padding + this.yAxisSpace : X,
				y1: this.type === 'bar' ? Y : this.padding,
				x2: this.type === 'bar' ? this.padding + this.yAxisSpace + this.innerWidth : X,
				y2: this.type === 'bar' ? Y : this.padding + this.innerHeight
			}
		},
		hoverRects () {
			return this.labels.map((x, index) => {
				return {
					x: (this.type === 'bar' ? 0 : this.innerWidth / this.labels.length * index) + this.padding + this.yAxisSpace + this.axesStrokeWidth / 2,
					y: this.padding + (this.type === 'bar' ? this.innerHeight / this.labels.length * index : 0),
					w: this.type === 'bar' ? this.innerWidth : this.innerWidth / this.labels.length,
					h: this.type === 'bar' ? this.innerHeight / this.labels.length : this.innerHeight
				}
			})
		},
		popUp () {
			let lengths = this.dataset.map(x => {
				return (x.label.length + x.data[this.hovered].toString().length + 1) * 10 + this.fontSize
			})
			lengths.push(this.labels[this.hovered].length * 10)
			const w = lengths.reduce((a, b) => { return Math.max(a, b) }) + this.padding
			const h = this.padding * (1 + this.dataset.length / 2) + (this.dataset.length + 1) * this.fontSize
			return {
				x: this.mousePos.x + this.fontSize + w > this.innerWidth + this.padding + this.yAxisSpace ? this.mousePos.x - this.fontSize - w : this.mousePos.x + this.fontSize,
				y: this.mousePos.y + this.fontSize + h > this.innerHeight + this.padding + this.xAxisSpace ? this.mousePos.y - this.fontSize - h : this.mousePos.y + this.fontSize,
				width: w,
				height: h
			}
		}
	},
	methods: {
		trackMouse (e, n) {
			this.mousePos = {
				x: e.clientX - e.target.getBoundingClientRect().left + this.padding + this.yAxisSpace + (this.type === 'bar' ? 0 : this.innerWidth / this.labels.length * n),
				y: e.clientY - e.target.getBoundingClientRect().top + this.padding + (this.type === 'bar' ? this.innerHeight / this.labels.length * n : 0)
			}
		}
	},
	data () {
		return {
			mousePos: null
		}
	}
}
</script>

<style scoped>
</style>
