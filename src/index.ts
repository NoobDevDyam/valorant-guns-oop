import Phantom from './classes/guns/Phantom';

const agents: string[] = ['sova', 'jett', 'neon'];
const skins: string[] = ['stock', 'cool skin', 'panit'];
const anim: string[] = ['music', 'inspecting', 'throwing'];
const points = {
	p1: { x: 324, y: 234 },
	p2: { x: 32, y: 34 },
};

const player1 = new Phantom(agents, skins, anim, 'lmb');

console.log(player1.bulletCount());
console.log(player1.shoot());
console.log(player1.skin());
console.log(player1.loadAnim());
console.log(player1.parsePointCoordinate(23, 43, 13, 34));
console.log(player1.parsePointCoordinate(points));
