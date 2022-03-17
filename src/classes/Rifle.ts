/* 
---BURGERSHOT CREW @ 2022---
Parent Class by Jam Bonifacio
----------------------------
*/

import { IGun } from "../interface/GunInterface";

export default abstract class Rifle implements IGun {
  protected rangeDamage: number[]
  protected damage: number
  protected gunName: string
  protected ammo: number
  protected magazine: number
  protected isWallbang: boolean
  

  constructor(
    protected agents: string[],
    protected skins: string[],
    protected animations: string[],
    protected primaryFire: string
  ){
    this.rangeDamage = [10, 10, 10]
    this.gunName = 'Rifle'
    this.ammo = 3 * this.magazine
    this.magazine = 0
    this.isWallbang = false
    this.damage = 0
  }

  bulletCount(): number {
    return this.ammo
  }

  reload(): string {
    return 'Gun is Reloading'
  }

  shoot(): string {
    return ''
  }

  getBodyPart() {
    return ''
  }

  randomDamage(bodyPart: string, wallbang: boolean): number{
    if (bodyPart === 'Head' && !wallbang) {
      return this.rangeDamage[0]
    } else if (bodyPart === 'Body' && !wallbang) {
      return this.rangeDamage[1]
    } else if (bodyPart === 'Legs' && !wallbang) {
      return this.rangeDamage[2]
    } else {
      return this.rangeDamage[Math.floor(Math.random() * this.rangeDamage.length)]
    }
  }

  checkHolder(): string {
    return ''
  }

  drop(): string {
    return ''
  }

  pickup(): string {
    return ''
  }

  nearbyAgent(): string {
    return ''
  }

  inspect(): string {
    return ''
  }

  checkHandOrientation(): string {
    return 'left or right'
  }

  skin(): string {
    return 'skin line'
  }

  loadAnim(): string {
    return 'Animation is loaded'
  }
}