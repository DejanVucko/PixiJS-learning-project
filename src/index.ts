import {
	Application,
	Container,
	Sprite,
	Text,
	Graphics,
	BitmapText,
	BitmapFont,
	ParticleContainer,
	Texture,
} from 'pixi.js'
import { AdvancedBloomFilter } from 'pixi-filters'
import { Emitter, upgradeConfig } from '@pixi/particle-emitter'
import * as particleSettings from '../static/particles/sunParticles.json'

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

const conty: Container = new Container()
conty.x = app.screen.width / 2
conty.y = app.screen.height / 3

const solaire: Sprite = Sprite.from('images/solaireofastora.jpg')
solaire.position.set(-200, 100)

const sun: Graphics = new Graphics()
sun.beginFill('0xffbe6f')
sun.drawCircle(0, 0, 250)
sun.endFill()
sun.angle = 30
sun.position.set(app.screen.width / 2 - 100, -app.screen.height / 3 + 50)

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
		fill: '#ffffff', // White, will be colored later
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
emitter.autoUpdate = true // If you keep it false, you have to update your particles yourself.
emitter.updateSpawnPos(200, 0)
emitter.emit = true

quote.text = 'If only I could be so grossely incandesant!'
quote.position.set(0, 420)

app.stage.addChild(conty)
app.stage.addChild(particleContainer)
solaire.addChild(label, quote)
conty.addChild(solaire, sun)
sun.filters = [sunFilter]
solaire.filters = [solaireFilter]
