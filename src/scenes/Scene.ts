import { AnimatedSprite, Container, Spritesheet, BaseTexture } from 'pixi.js'
import runAnimationData from '../../static/images/dodgeAnimation.json'

export class Scene extends Container {
	constructor() {
		super()

		this.initialize()
	}

	private async initialize(): Promise<void> {
		const sheet = new Spritesheet(BaseTexture.from(runAnimationData.meta.image), runAnimationData)
		await sheet.parse()
		const animatedKnight = new AnimatedSprite(sheet.animations['dodge'])
		this.addChild(animatedKnight)
		animatedKnight.anchor.set(0.5)
		animatedKnight.onFrameChange = this.onKnightFrameChange.bind(this)

		animatedKnight.animationSpeed = 0.55
		animatedKnight.play()
		setTimeout(() => {
			animatedKnight.stop()
		}, 5500)
	}

	private onKnightFrameChange(): void {
		this.position.x = this.position.x + 10
	}
}
