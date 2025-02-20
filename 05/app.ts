type CharacterType = 'Warrior' | 'Mage' | 'Healer';
type Skill = 'Slam' | 'Fireball' | 'Heal';

abstract class Character {
    private name: string;
    private _health: number;
   
    constructor(name: string, health: number = 100) {
        this.name = name;
        this._health = health;
    }

    get health(): number {
        return this._health;
    }

    set health(value: number) {
        this._health = Math.max(0, Math.min(value, 100));
        if (this._health === 0) {
            console.log(`${this.name} umiera`);
        }
    }

    getName(): string {
        return this.name;
    }

    abstract useSkill(actor: Character, target: Character): void;

    static performAction(actor: Character, target: Character) {
        actor.useSkill(actor, target);
    }
}

class WarriorCharacter extends Character {
    skill: Skill;
    constructor(name: string) {
        super(name);
        this.skill = 'Slam';
    }

    useSkill(actor: Character, target: Character): void {
        console.log(`${actor.name} używa ${this.skill} na ${target.name}`);
        target.health -= 15;
        console.log(`${target.type} ma teraz ${target.health} HP`);
    }
}

class MageCharacter extends Character {
    private skillUsageCount: number = 0;
    skill: Skill;
    constructor(name: string) {
        super(name);
        this.skill = 'Fireball';
    }

    useSkill(actor: Character, target: Character): void {
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

class HealerCharacter extends Character {
    skill: Skill;
    constructor(name: string) {
        super(name);
        this.skill = 'Heal';
    }

    useSkill(actor: Character, target: Character): void {
        console.log(`${actor.type} używa ${this.skill} na ${target.type}`);

        const healPercentage = Math.random() * (0.2 - 0.1) + 0.1;
        let healAmount = target.health * healPercentage;

        healAmount = parseFloat(healAmount.toFixed(1));

        target.health += healAmount;
        console.log(`${target.type} ma teraz ${target.health} punktów zdrowia`);
    }
}


const warrior = new WarriorCharacter("Warrior");
const mage = new MageCharacter("Mage");
const healer = new HealerCharacter("Healer");

while (warrior.health > 0 && mage.health > 0 && healer.health > 0) {
    Character.performAction(mage, warrior);
    if (warrior.health <= 0) break; 

    Character.performAction(mage, warrior);
    if (warrior.health <= 0) break; 

    Character.performAction(healer, mage);
    if (mage.health <= 0) break; 
}

console.log("Bitwa zakończona! Ktoś zginął.");