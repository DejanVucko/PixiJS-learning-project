import { AnimatedSprite, Container, Spritesheet, BaseTexture, Ticker } from 'pixi.js'
import dodgeAnimationData from '../../static/images/runAnimation.json'

export class Scene extends Container {
	private readonly screenWidth: number
	private readonly screenHeight: number

	private knight!: AnimatedSprite
	private readonly knightSpeed: number = 6
	private goingRight: boolean = true

	constructor(screenWidth: number, screenHeight: number) {
		super()
		this.screenWidth = screenWidth
		this.screenHeight = screenHeight
		this.initialize()
	}

	private async initialize(): Promise<void> {
		const sheet = new Spritesheet(BaseTexture.from(dodgeAnimationData.meta.image), dodgeAnimationData)
		await sheet.parse()
		this.knight = new AnimatedSprite(sheet.animations['run'])
		this.addChild(this.knight)
		this.knight.anchor.set(0.5)
		this.knight.position.y = this.screenHeight - 170
		this.knight.position.x = 0
		this.knight.play()
		this.knight.animationSpeed = 0.5
		this.knight.loop = true

		Ticker.shared.add(this.onKnightFrameChange.bind(this))
	}

	private onKnightFrameChange(deltatime: number): void {
		if (this.goingRight) {
			this.goRight(deltatime)
			this.knight.scale.x = 1
		} else {
			this.goLeft(deltatime)
			this.knight.scale.x = -1
		}
	}
	private goRight(deltatime: number): void {
		this.knight.position.x = this.knight.position.x + this.knightSpeed * deltatime
		if (this.knight.position.x >= this.screenWidth - 50) this.goingRight = false
	}
	private goLeft(deltatime: number): void {
		this.knight.position.x = this.knight.position.x - this.knightSpeed * deltatime
		if (this.knight.position.x <= 0) this.goingRight = true
	}
}
