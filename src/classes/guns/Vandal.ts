/* 
---BURGERSHOT CREW @ 2022---
Vandal
----------------------------
*/

import Rifle from '../Rifle';

export default class Vandal extends Rifle {
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
		this.gunName = 'Vandal';
		this.magazine = 25;
		this.rangeDamage = [160, 40, 34];
		this.fireRate = 9.75;
		this.runSpeed = 5.4;
		this.equipSpeed = 1;
		this.shotSpread = 0.25;
		this.reloadSpeed = 2.5;
		this.zoom = 1.25;
		this.isADS = false;
		this.isEmpty = false;
		this.isLeft = false;
	}

	scope() {
		this.isADS = true;
	}

	shoot(): string {
		this.ammo -= this.fireRate;
		if (!this.isADS) {
			this.fireRate = 9.7;
		} else {
			this.fireRate = 8.775;
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

	getBodyPart() {
		const bodyParts: string[] = ['Head', 'Body', 'Legs'];
		return bodyParts[Math.floor(Math.random() * bodyParts.length)];
	}

	randomDamage(bodyPart: string): number {
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

	checkHolder(): string {
		return this.agents[Math.floor(Math.random() * this.agents.length)];
	}

	drop(): string {
		return `dropped ${this.gunName}`;
	}

	pickup(): string {
		return `picked up ${this.gunName}`;
	}

	nearbyAgent(): string {
		return this.agents[Math.floor(Math.random() * this.agents.length)];
	}

	inspect(): string {
		return `skin is ${this.skin()}`;
	}

	checkHandOrientation(): string {
		const orientations: string[] = ['left', 'right'];
		return orientations[Math.floor(Math.random() * orientations.length)];
	}

	skin(): string {
		return this.skins[Math.floor(Math.random() * this.skins.length)];
	}

	loadAnim(): string {
		return 'Animation is loaded';
	}

	info(): string {
		return '';
	}
}
