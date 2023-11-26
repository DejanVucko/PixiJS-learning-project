import { Application, Container, Sprite, Graphics } from 'pixi.js'

const app = new Application({
	view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 900,
	height: 700,
})

const conty: Container = new Container()
conty.x = app.screen.width / 2
conty.y = app.screen.height / 2

app.stage.addChild(conty)

const solaire: Sprite = Sprite.from('images/solaireofastora.jpg')

const pivotCircle = new Graphics()
pivotCircle.beginFill(0xff0000)
pivotCircle.drawCircle(0, 0, 5) // Small circle to represent the pivot
pivotCircle.endFill()

const positionCircle = new Graphics()
pivotCircle.beginFill(0xffffff)
pivotCircle.drawCircle(0, 0, 5) // Small circle to represent the pivot
pivotCircle.endFill()

const graphy: Graphics = new Graphics()

graphy.beginFill(0xff00ff)
graphy.lineStyle(5, 0x00ff00).drawRect(0, 0, 100, 100)
graphy.endFill()

graphy.pivot.set(-50, -50)

// Add the circle to the pivot point of the rectangle
conty.addChild(solaire)
graphy.addChild(positionCircle)
graphy.addChild(pivotCircle)
conty.addChild(graphy)
positionCircle.position.set(graphy.position.x, graphy.position.y)
pivotCircle.position.set(graphy.pivot.x, graphy.pivot.y)
