'use strict'

class Particle {
  constructor(ctx, x, y) {
    this.ctx = ctx.getContext('2d')
    this.down = false
    this.gravity = 0.1
    this.vx = 0.8 + Math.random() * 1
    this.size = this.randomSize()
    this.x = x
    this.y = y
  }

  randomSize() {
    return Math.floor(Math.random() * 10) + 1
  }

  render() {
      this.ctx.fillStyle = 'rgba(0,255,255,0.25)'
      this.ctx.beginPath()
      this.ctx.arc(this.x,this.y,this.size,0,Math.PI*2,true)
      this.ctx.closePath()
      this.ctx.fill()
  }
}

class Canvas {
  constructor() {
    this.canvas = document.querySelector('canvas')
    this.resize()
    this.ctx = this.canvas.getContext('2d')
    this.particles = []
  }

  resize() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  removeRedundantParticles() {
    if (this.particles.length > 125) {
        this.particles = this.particles.slice(75, this.particles.length)
    }
  }

  draw() {
    this.removeRedundantParticles()
    this.clear()
    return this.update()
  }

  particleEvent() {
    window.addEventListener('mousemove', (e) => {
      let x = e.pageX
      let y = e.pageY
      this.particles.push(new Particle(this.canvas, x, y))
    })
  }

  update() {

    for (let i = 0; i < this.particles.length; i++) {
      let particle = this.particles[i]

      if (particle.gravity < -1) {
        particle.down = true
      }

      if (particle.down) {
        particle.gravity += 0.2
      } else {
        particle.gravity -= 0.2
      }

      particle.x -= particle.vx
      particle.y += particle.gravity
      particle.render()
    }

  }

  run() {
    this.draw()
    requestAnimationFrame(this.run.bind(this))
  }
}

const c = new Canvas()
c.run()
window.addEventListener('resize', c.resize)
c.particleEvent()
