/* 
---BURGERSHOT CREW @ 2022---
Vandal by Diadem Grace Arroz
----------------------------
*/

import Rifle from '../Rifle';

interface Coordinate {
	x: number;
	y: number;
}

export default class Vandal extends Rifle {
	override gunName: string;
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
	private gunRecovery: number;

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
        this.bulletTracers= '';
		this.gunRecovery = 0.375;
		this.magazine = 8;
		this.ammo = 3 * this.magazine;
	}

	scope() {
		this.isADS = true;
	}

	override shoot(): string {
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

	coordinate(obj: Coordinate): Coordinate;
	coordinate(x: number, y: number): Coordinate;

	coordinate(param1: unknown, param2?: unknown): Coordinate {
		let coord: Coordinate = {
			x: 0,
			y: 0
		};

		if (typeof param1 === 'object') {
			coord = param1 as Coordinate
		} else {
			coord = {
				x: Number(param1),
				y: Number(param2),
			};
		}
		return coord
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
		return 'DISPLAY INFORMATION';
	}

	pace(): string {
		return `${this.gunName}'s run speed is ${this.runSpeed}`
	}

	dropOff(): string {
		return 'No bullet drop off ranges'
	}

	accuracyReset(): number {
		return this.gunRecovery
	}

	override bulletCount(): number {
		if (this.magazine === 8) {
			this.ammo = 3 * this.magazine
		}
		return this.ammo
	}
}