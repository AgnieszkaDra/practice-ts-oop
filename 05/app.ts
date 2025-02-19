type CharacterType = 'Warrior' | 'Mage' | 'Healer';
type CharacterSkill = 'Slam' | 'Fireball' | 'Heal';

abstract class Character {
    private name: string;
    private _health: number;
    public type: CharacterType;
    public skill: CharacterSkill;

    constructor(name: string, type: CharacterType, skill: CharacterSkill, health: number = 100) {
        this.name = name;
        this.type = type;
        this._health = health;
        this.skill = skill;
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

class WarriorClass extends Character {
    constructor(name: string) {
        super(name, 'Warrior', 'Slam');
    }

    useSkill(actor: Character, target: Character): void {
        console.log(`${actor.type} używa ${actor.skill} na ${target.type}`);
        target.health -= 15;
        console.log(`${target.type} ma teraz ${target.health} HP`);
    }
}

class MageClass extends Character {
    private skillUsageCount: number = 0;

    constructor(name: string) {
        super(name, 'Mage', 'Fireball');
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

class HealerClass extends Character {
    constructor(name: string) {
        super(name, 'Healer', 'Heal');
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

const warrior = new WarriorClass("Warrior");
const mage = new MageClass("Mage");
const healer = new HealerClass("Healer");

Character.performAction(mage, warrior); 
Character.performAction(mage, warrior); 
Character.performAction(healer, mage); 
