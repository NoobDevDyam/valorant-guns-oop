/* 
---BURGERSHOT CREW @ 2022---
Gun interface by Jam Bonifacio
----------------------------
*/

export interface IGun {
	bulletCount: () => number;
	reload: () => string;
	shoot: () => string;
	randomDamage: (bodyPart: string, wallbang: boolean) => number;
	checkHolder: () => string;
	drop: () => string;
	pickup: () => string;
	nearbyAgent: () => string;
	inspect: () => string;
	checkHandOrientation: () => string;
	skin: () => string;
	loadAnim: () => string;
}
