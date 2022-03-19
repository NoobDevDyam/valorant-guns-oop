/* 
---BURGERSHOT CREW @ 2022---
Bulldog by Jam Bonifacio
----------------------------
*/

import Rifle from '../Rifle';

export default class Bulldog extends Rifle {
	private fireRate: number;
	private runSpeed: number;
	private equipSpeed: number;
	private shotSpread: number;
	private reloadSpeed: number;
	private zoom: number;
	private burstFire: number;
	private isADS: boolean;
	private isEmpty: boolean;
	private isLeft: boolean;
	private bulletTracers: string;

	constructor(
		agents: string[],
		skins: string[],
		animations: string[],
		primaryFire: string
	) {
		super(agents, skins, animations, primaryFire);
		this.gunName = 'Bulldog';
		this.magazine = 24;
		this.rangeDamage = [115, 35, 29];
		this.fireRate = 10;
		this.runSpeed = 5.4;
		this.equipSpeed = 1;
		this.shotSpread = 0.3;
		this.reloadSpeed = 2.5;
		this.zoom = 1.25;
		this.burstFire = 3;
		this.isADS = false;
		this.isEmpty = false;
		this.isLeft = false;
    this.bulletTracers = ''
	}

	scope() {
		this.isADS = true;
	}

	override shoot(): string {
		this.ammo -= this.fireRate;
		if (!this.isADS) {
			this.fireRate = 10;
		} else {
			this.fireRate = 6.316;
		}

		if (this.ammo > 0) {
			if (!this.isWallbang) {
				this.damage = this.randomDamage(this.getBodyPart());
			} else {
				this.damage = this.randomDamage(this.getBodyPart()) - 10;
			}
			return `Gun is Dealing ${this.damage}`;
		} else {
			return 'no ammo';
		}
	}

	override getBodyPart() {
		const bodyParts: string[] = ['Head', 'Body', 'Legs'];
		return bodyParts[Math.floor(Math.random() * bodyParts.length)];
	}

	override randomDamage(bodyPart: string): number {
		if (bodyPart === 'Head') {
			return this.rangeDamage[0];
		} else if (bodyPart === 'Body') {
			return this.rangeDamage[1];
		} else if (bodyPart === 'Legs') {
			return this.rangeDamage[2];
		} else {
			return this.rangeDamage[
				Math.floor(Math.random() * this.rangeDamage.length)
			];
		}
	}

	override checkHolder(): string {
		return this.agents[Math.floor(Math.random() * this.agents.length)];
	}

	override drop(): string {
		return `dropped ${this.gunName}`;
	}

	override pickup(): string {
		return `picked up ${this.gunName}`;
	}

	override nearbyAgent(): string {
		return this.agents[Math.floor(Math.random() * this.agents.length)];
	}

	override inspect(): string {
		return `skin is ${this.skin()}`;
	}

	override checkHandOrientation(): string {
		const orientations: string[] = ['left', 'right'];
		return orientations[Math.floor(Math.random() * orientations.length)];
	}

	override skin(): string {
		return this.skins[Math.floor(Math.random() * this.skins.length)];
	}

	override loadAnim(): string {
		return 'Animation is loaded';
	}

	info(): string {
		return `
    LOAD GUN INFORMATION
		--------------------
		Fire Rate: ${this.fireRate}
		Run Speed: ${this.runSpeed}
		Equip Speed: ${this.equipSpeed}
		1st Shot Spread: ${this.shotSpread}
		Reload Speed: ${this.reloadSpeed}
		Magazine: ${this.magazine}
		--------------------------
		Damage: ${this.rangeDamage}
		--------------------------
		Zoom: ${this.zoom}
		Burst Fire: ${this.burstFire}
		Crosshair follows recoil
    `;
	}

	getCrosshairPosX(): number {
		return this.recoilPosX()
	}

	getCrosshairPosY(): number {
		return this.recoilPosY()
	}

	recoilPosX(): number {
		return Math.floor(Math.random() * 800)
	}

	recoilPosY(): number {
		return Math.floor(Math.random() * 400)
	}

}
