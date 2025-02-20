"use strict";
class Character {
    constructor(name, health = 100) {
        this.name = name;
        this._health = health;
    }
    get health() {
        return this._health;
    }
    set health(value) {
        this._health = Math.max(0, Math.min(value, 100));
        if (this._health === 0) {
            console.log(`${this.name} umiera`);
        }
    }
    getName() {
        return this.name;
    }
    static performAction(actor, target) {
        actor.useSkill(actor, target);
    }
}
class WarriorCharacter extends Character {
    constructor(name) {
        super(name);
    }
    getSkill() {
        return 'Slam';
    }
    useSkill(actor, target) {
        console.log(`${actor.getName()} używa ${this.getSkill()} na ${target.getName()}`);
        target.health -= 15;
        console.log(`${target.getName()} ma teraz ${target.health} HP`);
    }
}
class MageCharacter extends Character {
    constructor(name) {
        super(name);
        this.skillUsageCount = 0;
    }
    getSkill() {
        return 'Fireball';
    }
    useSkill(actor, target) {
        this.skillUsageCount++;
        console.log(`${actor.getName()} używa ${actor.getSkill()} na ${target.getName()}`);
        target.health -= 10;
        console.log(`${target.getName()} ma teraz ${target.health} HP`);
        if (this.skillUsageCount >= 1) {
            actor.health -= actor.health * 0.1;
            console.log(`${actor.getName()} ma teraz ${actor.health} punktów zdrowia`);
        }
    }
}
class HealerCharacter extends Character {
    constructor(name) {
        super(name);
    }
    getSkill() {
        return 'Fireball';
    }
    useSkill(actor, target) {
        console.log(`${actor.getName()} używa ${this.getSkill()} na ${target.getName()}`);
        const healPercentage = Math.random() * (0.2 - 0.1) + 0.1;
        let healAmount = target.health * healPercentage;
        healAmount = parseFloat(healAmount.toFixed(1));
        target.health += healAmount;
        console.log(`${target.getName()} ma teraz ${target.health} punktów zdrowia`);
    }
}
const warrior = new WarriorCharacter("Warrior");
const mage = new MageCharacter("Mage");
const healer = new HealerCharacter("Healer");
while (warrior.health > 0 && mage.health > 0 && healer.health > 0) {
    Character.performAction(mage, warrior);
    if (warrior.health <= 0)
        break;
    Character.performAction(mage, warrior);
    if (warrior.health <= 0)
        break;
    Character.performAction(healer, mage);
    if (mage.health <= 0)
        break;
}
console.log("Bitwa zakończona! Ktoś zginął.");
