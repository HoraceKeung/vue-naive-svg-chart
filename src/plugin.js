import Chart from './Chart.vue'

module.exports = {
	install: function (Vue, options) {
		Vue.component('vue-naive-svg-chart', Chart)
	}
}
