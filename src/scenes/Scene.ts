import { AnimatedSprite, Container, Spritesheet, BaseTexture, Ticker, Sprite } from 'pixi.js'
import { Tween, Group } from 'tweedle.js'
import { Keyboard } from '../Keyboard'
import dodgeAnimationData from '../../static/images/runAnimation.json'

export class Scene extends Container {
	private readonly screenWidth: number
	private readonly screenHeight: number

	private knight!: AnimatedSprite
	private follower!: Sprite
	private readonly knightSpeed: number = 6
	private jumpOnCooldown: boolean = false

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
		this.knight.position.x = this.screenWidth / 2
		this.knight.height = 200
		this.knight.width = 134
		this.knight.play()
		this.knight.animationSpeed = 0.2
		this.knight.loop = true
		this.knight.eventMode = 'dynamic'

		Keyboard.initialize()

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
		tweeny.to({ x: 0.5, y: 0.5 }, 2000).repeat(Infinity).yoyo(true).start()
		group.add(tweeny)

		document.addEventListener('keydown', this.jump.bind(this))
		const globalGroup = Group.shared
		ticker
			.add(this.goRight.bind(this))
			.add(this.goLeft.bind(this))
			.add(() => this.updateTween(group, globalGroup))
	}
	private updateTween(group: Group, group2: Group): void {
		group.update()
		group2.update()
	}
	private jump(): void {
		if (Keyboard.state.get('Space') === true) {
			const currentY = this.knight.position.y
			const jumpHeight = 200

			if (!this.jumpOnCooldown) {
				const jumpTween = new Tween(this.knight.position)
				jumpTween
					.to({ y: currentY - jumpHeight }, 300)
					.repeat(1)
					.repeatDelay(100)
					.yoyo(true)
					.start()
				this.jumpOnCooldown = true
				setTimeout(() => {
					this.jumpOnCooldown = false
				}, 700)
			}
		}
	}

	private goRight(deltatime: number): void {
		if (Keyboard.state.get('KeyD') === true && !(this.knight.position.x >= this.screenWidth - 25)) {
			this.knight.position.x = this.knight.position.x + this.knightSpeed * deltatime
			this.knight.scale.x = Math.abs(this.knight.scale.x)
		} else {
			return
		}
	}
	private goLeft(deltatime: number): void {
		if (Keyboard.state.get('KeyA') === true && !(this.knight.position.x <= 0)) {
			this.knight.position.x = this.knight.position.x - this.knightSpeed * deltatime
			this.knight.scale.x = -Math.abs(this.knight.scale.x)
		} else {
			return
		}
	}
}
