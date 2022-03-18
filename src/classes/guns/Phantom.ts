/* 
---BURGERSHOT CREW @ 2022---
Phantom by Jerome Cabugwason
----------------------------
*/

import Rifle from '../Rifle';

interface rangedDamage {
	damage: number;
}
export default class Phantom extends Rifle {
	private fireRate: number;
	private runSpeed: number;
	private equipSpeed: number;
	private shotSpread: number;
	private reloadSpeed: number;
	private zoom: number;
	private isADS: boolean;
	private isEmpty: boolean;
	private isLeft: boolean;
	private bulletTracers: string;
	private range: number[];
	private hasRangeDamage: number[][];

	constructor(
		agents: string[],
		skins: string[],
		animations: string[],
		primaryFire: string
	) {
		super(agents, skins, animations, primaryFire);
		this.gunName = 'Phantom';
		this.magazine = 30;
		this.ammo = 3 * this.magazine;
		this.hasRangeDamage = [
			[156, 140, 124],
			[39, 35, 31],
			[33, 29, 26],
		];
		this.range = [8, 15, 30];
		this.fireRate = 11;
		this.runSpeed = 5.4;
		this.equipSpeed = 1;
		this.shotSpread = 0.2;
		this.reloadSpeed = 2.5;
		this.zoom = 1.25;
		this.isADS = false;
		this.isEmpty = false;
		this.isLeft = false;
		this.bulletTracers = '';
	}

	scope() {
		this.isADS = true;
	}

	override shoot(): string {
		if (!this.isADS) {
			this.fireRate = 10;
		} else {
			this.fireRate = 6.316;
		}

		this.ammo -= this.fireRate;

		if (this.ammo > 0) {
			if (!this.isWallbang) {
				this.damage = this.dealDamage(this.getBodyPart(), this.getRange());
			} else {
				this.damage = this.dealDamage(this.getBodyPart(), this.getRange()) - 10;
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

	dealDamage(bodyPart: string, range: number): number {
		let damagePts: rangedDamage = {
			damage: 0,
		};

		// multidimensional array finder
		if (bodyPart === 'Head') {
			switch (range) {
				case 8:
					damagePts = { damage: this.hasRangeDamage[0][0] };
					break;
				case 15:
					damagePts = { damage: this.hasRangeDamage[0][1] };
					break;
				case 30:
					damagePts = { damage: this.hasRangeDamage[0][2] };
					break;

				default:
					break;
			}
		} else if (bodyPart === 'Body') {
			switch (range) {
				case 8:
					damagePts = { damage: this.hasRangeDamage[1][0] };
					break;
				case 15:
					damagePts = { damage: this.hasRangeDamage[1][1] };
					break;
				case 30:
					damagePts = { damage: this.hasRangeDamage[1][2] };
					break;

				default:
					break;
			}
		} else if (bodyPart === 'Legs') {
			switch (range) {
				case 8:
					damagePts = { damage: this.hasRangeDamage[2][0] };
					break;
				case 15:
					damagePts = { damage: this.hasRangeDamage[2][1] };
					break;
				case 30:
					damagePts = { damage: this.hasRangeDamage[2][2] };
					break;

				default:
					break;
			}
		}

		return damagePts.damage;
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
		return 'Info is displayed here';
	}

	// random range finder
	getRange(): number {
		return this.range[Math.floor(Math.random() * this.range.length)];
	}
}
