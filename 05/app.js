"use strict";
class Character {
    constructor(name, type, skill, health = 100) {
        this.name = name;
        this.type = type;
        this._health = health;
        this.skill = skill;
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
class WarriorClass extends Character {
    constructor(name) {
        super(name, 'Warrior', 'Slam');
    }
    useSkill(actor, target) {
        console.log(`${actor.type} używa ${actor.skill} na ${target.type}`);
        target.health -= 15;
        console.log(`${target.type} ma teraz ${target.health} HP`);
    }
}
class MageClass extends Character {
    constructor(name) {
        super(name, 'Mage', 'Fireball');
        this.skillUsageCount = 0;
    }
    useSkill(actor, target) {
        this.skillUsageCount++;
        console.log(`${actor.type} używa ${actor.skill} na ${target.type}`);
        target.health -= 10;
        console.log(`${target.type} ma teraz ${target.health} HP`);
        if (this.skillUsageCount >= 1) {
            actor.health -= actor.health * 0.1;
            console.log(`${actor.type} ma teraz ${actor.health} punktów zdrowia`);
        }
    }
}
class HealerClass extends Character {
    constructor(name) {
        super(name, 'Healer', 'Heal');
    }
    useSkill(actor, target) {
        console.log(`${actor.type} używa ${this.skill} na ${target.type}`);
        const healPercentage = Math.random() * (0.2 - 0.1) + 0.1;
        let healAmount = target.health * healPercentage;
        healAmount = parseFloat(healAmount.toFixed(1));
        target.health += healAmount;
        console.log(`${target.type} ma teraz ${target.health} punktów zdrowia`);
    }
}
const warrior = new WarriorClass("Warrior");
const mage = new MageClass("Mage");
const healer = new HealerClass("Healer");
// ✅ Loop until one of them dies
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
