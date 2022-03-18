import Phantom from './classes/guns/Phantom';

const agents: string[] = ['sova', 'jett', 'neon'];
const skins: string[] = ['stock', 'cool skin', 'panit'];
const anim: string[] = ['music', 'inspecting', 'throwing'];

const player1 = new Phantom(agents, skins, anim, 'lmb');

console.log(player1.bulletCount());
console.log(player1.shoot());
console.log(player1.skin());
