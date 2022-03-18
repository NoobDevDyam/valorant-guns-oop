/* 
---BURGERSHOT CREW @ 2022---
Phantom by Jerome Cabugwason
----------------------------
*/

import Rifle from '../Rifle';

interface rangedDamage {
	damage: number;
}

interface PointCoordinates {
	p1: { x: number; y: number };
	p2: { x: number; y: number };
}
export default class Phantom extends Rifle {
	override gunName: string;
	override animations: string[];
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
	private damagedBodyPart: string;

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
		this.damagedBodyPart = '';
		this.animations = animations;
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
				this.damagedBodyPart = this.damagedBodyPart;
			} else {
				this.damage = this.dealDamage(this.getBodyPart(), this.getRange()) - 10;
				this.damagedBodyPart = this.damagedBodyPart;
			}
			return `${this.gunName} is Dealing ${this.damage} in the ${this.damagedBodyPart}`;
		} else {
			this.isEmpty = true;
			this.reload();
			return 'no ammo, reloaded';
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
					damagePts = {
						damage: this.hasRangeDamage[0][0],
					};
					break;
				case 15:
					damagePts = {
						damage: this.hasRangeDamage[0][1],
					};
					break;
				case 30:
					damagePts = {
						damage: this.hasRangeDamage[0][2],
					};
					break;

				default:
					break;
			}
		} else if (bodyPart === 'Body') {
			switch (range) {
				case 8:
					damagePts = {
						damage: this.hasRangeDamage[1][0],
					};
					break;
				case 15:
					damagePts = {
						damage: this.hasRangeDamage[1][1],
					};
					break;
				case 30:
					damagePts = {
						damage: this.hasRangeDamage[1][2],
					};
					break;

				default:
					break;
			}
		} else if (bodyPart === 'Legs') {
			switch (range) {
				case 8:
					damagePts = {
						damage: this.hasRangeDamage[2][0],
					};
					break;
				case 15:
					damagePts = {
						damage: this.hasRangeDamage[2][1],
					};
					break;
				case 30:
					damagePts = {
						damage: this.hasRangeDamage[2][2],
					};
					break;

				default:
					break;
			}
		}

		this.damagedBodyPart = bodyPart;
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
		return this.animations[Math.floor(Math.random() * this.animations.length)];
	}

	info(): string {
		return 'Info is displayed here';
	}

	// random range finder
	getRange(): number {
		return this.range[Math.floor(Math.random() * this.range.length)];
	}

	// parses coordinates between 2 points
	parsePointCoordinate(obj: PointCoordinates): PointCoordinates;
	parsePointCoordinate(
		x1: number,
		y1: number,
		x2: number,
		y2: number
	): PointCoordinates;

	parsePointCoordinate(
		arg1: unknown,
		arg2?: unknown,
		arg3?: unknown,
		arg4?: unknown
	): PointCoordinates {
		let points: PointCoordinates = {
			p1: { x: 0, y: 0 },
			p2: { x: 0, y: 0 },
		};

		if (typeof arg1 === 'object') {
			points = {
				...(arg1 as PointCoordinates),
			};
		} else {
			points = {
				p1: {
					x: arg1 as number,
					y: arg2 as number,
				},

				p2: {
					x: arg3 as number,
					y: arg4 as number,
				},
			};
		}

		return points;
	}

	// reload gun
	override reload(): string {
		if (this.magazine === 0) {
			this.magazine = 30;
			this.isEmpty = false;
			return 'Reloading mags';
		}
		return 'Still got bullets';
	}

	meleeAttack(): string {
		let agent = this.agents[Math.floor(Math.random() * this.agents.length)];
		return `${agent} used melee attack on ${this.nearbyAgent()}`;
	}
}
