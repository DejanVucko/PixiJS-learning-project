import { Container, Sprite } from 'pixi.js'

export class Scene extends Container {
	private readonly screenWidth: number
	private readonly screenHeight: number
	public solaire: Sprite

	constructor(screenWidth: number, screenHeight: number) {
		super()
		this.screenWidth = screenWidth
		this.screenHeight = screenHeight

		this.solaire = Sprite.from('images/solaireofastora.jpg')
		this.solaire.position.set(this.screenWidth / 2 - 100, this.screenHeight / 2)
		this.solaire.pivot.set(200, 200)
		this.addChild(this.solaire)
	}
}
