import { Application, Graphics, ParticleContainer, Texture } from 'pixi.js'
import { AdvancedBloomFilter } from 'pixi-filters'
import { Emitter, upgradeConfig } from '@pixi/particle-emitter'
import * as particleSettings from '../static/particles/sunParticles.json'
import { Scene } from './scenes/Scene'

const sunFilter = new AdvancedBloomFilter({ bloomScale: 3, blur: 15, quality: 13 })
const particleContainer = new ParticleContainer()

const app = new Application({
	view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1920,
	height: 1080,
})

const sceny: Scene = new Scene(app.screen.width, app.screen.height)

const sun: Graphics = new Graphics()
sun.beginFill('0xffbe6f')
sun.drawCircle(0, 0, 250)
sun.endFill()
sun.angle = 30
sun.position.set(app.screen.width - 100, 50)

const emitter = new Emitter(particleContainer, upgradeConfig(particleSettings, Texture.from('images/particle.png')))
emitter.autoUpdate = true
emitter.updateSpawnPos(200, 0)
emitter.emit = true

app.stage.addChild(sceny, sun)
sun.filters = [sunFilter]
