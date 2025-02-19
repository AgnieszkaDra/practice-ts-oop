"use strict";
class Character {
    constructor(name, type, action, skill, health = 100) {
        this.name = name;
        this.type = type;
        this._health = health;
        this.action = action;
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
        super(name, 'Warrior', 'attack', 'Slam');
    }
    useSkill(actor, target) {
        console.log(`${actor.type} używa ${actor.skill} na ${target.type}`);
        target.health -= 15;
        console.log(`${target.type} ma teraz ${target.health} HP`);
    }
}
class MageClass extends Character {
    constructor(name) {
        super(name, 'Mage', 'attack', 'Fireball');
        this.skillUsageCount = 0;
    }
    useSkill(actor, target) {
        this.skillUsageCount++;
        console.log(`Mage skill used ${this.skillUsageCount} times`);
        console.log(`${actor.type} używa ${this.skill} na ${target.type}`);
        target.health -= 10;
        console.log(`${target.type} ma teraz ${target.health} HP`);
        if (this.skillUsageCount >= 1) {
            target.health -= 10;
            actor.health -= actor.health * 0.1;
            console.log(`Ola${actor.type} ma teraz ${actor.health} HP`);
        }
    }
}
const warrior = new WarriorClass("Warrior");
const mage = new MageClass("Mage");
Character.performAction(mage, warrior);
Character.performAction(mage, warrior);
