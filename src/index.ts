import { Application, Text, Graphics, BitmapText, BitmapFont, ParticleContainer, Texture } from 'pixi.js'
import { AdvancedBloomFilter } from 'pixi-filters'
import { Emitter, upgradeConfig } from '@pixi/particle-emitter'
import * as particleSettings from '../static/particles/sunParticles.json'
import { Scene } from './scenes/Scene'

const sunFilter = new AdvancedBloomFilter({ bloomScale: 3, blur: 15, quality: 13 })
const solaireFilter = new AdvancedBloomFilter({ bloomScale: 0.3, blur: 1 })
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

const label: Text = new Text('Solaire of Astora', {
	fontStyle: 'oblique',
	fontWeight: '500',
	fontSize: 24,
	fontFamily: 'Verdana',
	align: 'center',
	fill: ['#ff5c0a', '#c64600'],
})
label.position.set(0, -30)

BitmapFont.from(
	'Verdana',
	{
		fill: '#ffffff',
		fontFamily: 'Verdana',
		fontSize: 20,
	},
	{ chars: BitmapFont.ASCII }
)

const quote: BitmapText = new BitmapText('Praise The Sun!', {
	fontSize: 20,
	fontName: 'Verdana',
	align: 'left',
	tint: 0xc64600,
})

const emitter = new Emitter(particleContainer, upgradeConfig(particleSettings, Texture.from('images/particle.png')))
emitter.autoUpdate = true
emitter.updateSpawnPos(200, 0)
emitter.emit = true

quote.text = 'If only I could be so grossly incandescent!'
quote.position.set(0, 400)

app.stage.addChild(sceny, sun)
app.stage.addChild(particleContainer)
sceny.solaire.addChild(label, quote)
sun.filters = [sunFilter]
sceny.solaire.filters = [solaireFilter]
