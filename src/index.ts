import { Application, Texture, Sprite } from 'pixi.js'
import { AdvancedBloomFilter } from 'pixi-filters'
import { Scene } from './scenes/Scene'

const sunFilter = new AdvancedBloomFilter({ bloomScale: 0.2, blur: 0, quality: 15 })

const app = new Application({
	view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: window.innerWidth,
	height: window.innerHeight,
})
const sceny: Scene = new Scene(app.screen.width, app.screen.height)

const texture = Texture.from('images/backgroundCave.png')

const background: Sprite = Sprite.from(texture)
texture.baseTexture.once('loaded', () => {
	const imageWidth = texture.baseTexture.width
	const imageHeight = texture.baseTexture.height

	const scale = Math.max(app.screen.width / imageWidth, app.screen.height / imageHeight)

	background.scale.set(scale)
	background.anchor.set(0.5)

	background.position.set(app.screen.width / 2, app.screen.height / 2)
})
background.filters = [sunFilter]

app.stage.addChild(background, sceny)
