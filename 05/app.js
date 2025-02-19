"use strict";
class Character {
    constructor(name, type, health = 100) {
        this.name = name;
        this.type = type;
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
    static performAction(actor, target, skill) {
        actor.useSkill(target, skill);
    }
}
class WarriorClass extends Character {
    constructor(name) {
        super(name, { action: 'Slam', type: 'attack', health: 10 });
    }
    useSkill(target, skill) {
        if (this.type.action === 'Slam' && skill === 'Slam') {
            console.log(`${this.getName()} atakuje ${target.getName()} umiejętnością Slam!`);
            target.health -= 15;
            console.log(`${target.getName()} ma teraz ${target.health} punktów zdrowia.`);
        }
        else {
            console.log(`${this.getName()} nie może użyć umiejętności ${skill} - nie jest dostępna.`);
        }
    }
}
class MageClass extends Character {
    constructor(name) {
        super(name, { action: 'Fireball', type: 'attack', health: 15 });
        this.burnDamage = 0;
    }
    useSkill(target, skill) {
        if (this.type.action === 'Fireball' && skill === 'Fireball') {
            console.log(`${this.getName()} rzuca Fireball na ${target.getName()}!`);
            const baseDamage = 10;
            target.health -= baseDamage + this.burnDamage;
            this.burnDamage = Math.floor(baseDamage * 0.1);
            console.log(`${target.getName()} ma teraz ${target.health} punktów zdrowia.`);
        }
        else {
            console.log(`${this.getName()} nie może użyć umiejętności ${skill} - nie jest dostępna.`);
        }
        if (target.health <= 0) {
            console.log(`${target.getName()} umiera`);
        }
    }
}
class HealerClass extends Character {
    constructor(name) {
        super(name, { action: 'Heal', type: 'heal', health: 10 });
    }
    useSkill(target, skill) {
        if (this.type.action === 'Heal' && skill === 'Heal') {
            const healAmount = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
            console.log(`${this.getName()} leczy ${target.getName()} umiejętnością Heal o ${healAmount} punktów zdrowia.`);
            target.health += healAmount;
            console.log(`${target.getName()} ma teraz ${target.health} punktów zdrowia.`);
        }
        else {
            console.log(`${this.getName()} nie może użyć umiejętności ${skill} - nie jest dostępna.`);
        }
    }
}
const warrior = new WarriorClass("Warrior");
const mage = new MageClass("Mage");
const healer = new HealerClass("Healer");
Character.performAction(warrior, mage, 'Slam');
Character.performAction(mage, warrior, 'Fireball');
Character.performAction(mage, warrior, 'Fireball');
Character.performAction(healer, mage, 'Heal');
