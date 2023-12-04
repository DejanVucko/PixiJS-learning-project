import { AnimatedSprite, Container, Spritesheet, BaseTexture, Ticker, Sprite } from 'pixi.js'
import { Tween, Group } from 'tweedle.js'
import dodgeAnimationData from '../../static/images/runAnimation.json'

export class Scene extends Container {
	private readonly screenWidth: number
	private readonly screenHeight: number

	private knight!: AnimatedSprite
	private follower!: Sprite
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
		this.knight.position.y = this.screenHeight - 130
		this.knight.position.x = 0
		this.knight.height = 200
		this.knight.width = 134
		this.knight.play()
		this.knight.animationSpeed = 0.2
		this.knight.loop = true
		this.knight.eventMode = 'dynamic'

		let fairy = this.follower
		fairy = Sprite.from('images/particle.png')
		fairy.tint = 0xfffdd0
		fairy.anchor.set(0.5)
		fairy.position.set(-25)
		this.knight.addChild(fairy)

		const ticker = new Ticker()
		ticker.autoStart = true

		const group = new Group()

		const tweeny = new Tween(fairy.scale)
		tweeny.to({ x: 0.5, y: 0.5 }, 800).repeat(Infinity).yoyo(true).start()

		group.add(tweeny)

		document.addEventListener('keydown', this.jump.bind(this))
		document.addEventListener('keyup', this.gravity.bind(this))

		ticker.add(this.onKnightFrameChange.bind(this)).add(() => this.updateTween(group))
	}
	private updateTween(group: Group): void {
		group.update()
	}
	private onKnightFrameChange(deltatime: number): void {
		if (this.goingRight) {
			this.goRight(deltatime)
		} else {
			this.goLeft(deltatime)
		}
	}
	private jump(): void {
		this.knight.y = this.knight.y - 200
	}
	private gravity(): void {
		this.knight.y = this.knight.y - 200
	}
	private goRight(deltatime: number): void {
		this.knight.position.x = this.knight.position.x + this.knightSpeed * deltatime
		if (this.knight.position.x >= this.screenWidth - 25) {
			this.goingRight = false
			this.knight.scale.x = -this.knight.scale.x
		}
	}
	private goLeft(deltatime: number): void {
		this.knight.position.x = this.knight.position.x - this.knightSpeed * deltatime
		if (this.knight.position.x <= 0) {
			this.goingRight = true
			this.knight.scale.x = -this.knight.scale.x
		}
	}
}
