// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'

Vue.config.productionTip = false

let insideRadius = 0
let outsideRadius = 200
let textRadius = 160

/* eslint-disable no-new */
new Vue({
  el: '#roulette_wheel',
  router,
  data: {
    list: [
      {
        probability: 20,
        name: 'Eddie Wang'
      },
      {
        probability: 30,
        name: 'Andy Chen'
      },
      {
        probability: 40,
        name: 'Steve Yu'
      },
      {
        probability: 10,
        name: 'Jeff Guo'
      }
    ]
  },
  mounted () {
    this._drawRouletteWheel()
  },
  computed: {
    computedRouletteList () {
      let computedRouletteList = []

      this.list.forEach((item) => {
        let color = this.getRandomColor()
        let radian = this.getRadianByProbablity(item.probability)
        let name = item.name

        computedRouletteList.push({name, color, radian})
      })
      return computedRouletteList
    }
  },
  methods: {
    getRandomColor () {
      let letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    getRadianByProbablity (probability) {
      let angle = 360 * probability / 100

      return Math.PI * angle / 180
    },
    _drawRouletteWheel () {
      let rouletteWheelEl = document.getElementById('roulette_canvas')

      if (rouletteWheelEl.getContext) {
        let canvasRouletteWheel = rouletteWheelEl.getContext('2d')
        let previousItemRadian = 0

        canvasRouletteWheel.translate(250, 250)
        canvasRouletteWheel.clearRect(0, 0, 500, 500)
        canvasRouletteWheel.strokeStyle = 'gray'
        canvasRouletteWheel.lineWidth = 1
        canvasRouletteWheel.font = '14px sans-serif'

        this.computedRouletteList.forEach((item) => {
          let beginRadian = previousItemRadian
          canvasRouletteWheel.fillStyle = item.color
          canvasRouletteWheel.beginPath()
          canvasRouletteWheel.arc(0, 0, outsideRadius, beginRadian, beginRadian + item.radian, false)
          canvasRouletteWheel.arc(0, 0, insideRadius, beginRadian + item.radian, beginRadian, true)
          canvasRouletteWheel.stroke()
          canvasRouletteWheel.fill()
          canvasRouletteWheel.save()
          canvasRouletteWheel.shadowOffsetX = 1
          canvasRouletteWheel.shadowOffsetY = 1
          canvasRouletteWheel.shadowBlur = 1
          canvasRouletteWheel.shadowColor = 'black'
          canvasRouletteWheel.fillStyle = 'white'
          canvasRouletteWheel.translate(Math.cos(beginRadian + item.radian / 2) * textRadius, Math.sin(beginRadian + item.radian / 2) * textRadius)
          canvasRouletteWheel.rotate(beginRadian + item.radian / 2 + Math.PI / 2)
          let text = item.name
          canvasRouletteWheel.fillText(text, -canvasRouletteWheel.measureText(text).width / 2, 0)
          canvasRouletteWheel.restore()

          previousItemRadian = previousItemRadian + item.radian
        })
      }
    }
  }
})
