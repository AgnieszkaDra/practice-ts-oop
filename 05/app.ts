type SkillType = 'Slam' | 'Fireball' | 'Heal';
type CharacterType = Warrior | Mage | Healer;

interface Warrior {
    action: 'Slam';
    type: 'attack';
    health: number;
}

interface Mage {
    action: 'Fireball';
    type: 'attack';
    health: number;
}

interface Healer {
    action: 'Heal';
    type: 'heal';
    health: number;
}

abstract class Character {
    private name: string;
    private _health: number;
    protected type: CharacterType;

    constructor(name: string, type: CharacterType, health: number = 100) {
        this.name = name;
        this.type = type;
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

    abstract useSkill(target: Character, skill: SkillType): void;
}

class WarriorClass extends Character {
    private skillUsageCount: number = 0; // Independent counter for WarriorClass

    constructor(name: string) {
        super(name, { action: 'Slam', type: 'attack', health: 10 });
    }

    useSkill(target: Character, skill: SkillType): void {
        this.skillUsageCount++; // Increment only for this Warrior instance
        console.log(`Warrior skill used ${this.skillUsageCount} times`);

        if (skill === 'Slam') {
            console.log(`${this.getName()} używa ${skill} na ${target.getName()}`);
            target.health -= 10;
            console.log(`${target.getName()} ma teraz ${target.health} HP`);
        } else {
            console.log(`${this.getName()} nie może użyć ${skill}`);
        }
    }
}

class MageClass extends Character {
    private skillUsageCount: number = 0; // Independent counter for MageClass

    constructor(name: string) {
        super(name, { action: 'Fireball', type: 'attack', health: 10 });
    }

    useSkill(target: Character, skill: SkillType): void {
        this.skillUsageCount++; // Increment only for this Mage instance
        console.log(`Mage skill used ${this.skillUsageCount} times`);

        if (skill === 'Fireball') {
            console.log(`${this.getName()} używa ${skill} na ${target.getName()}`);
            target.health -= 15;
            console.log(`${target.getName()} ma teraz ${target.health} HP`);
        } else {
            console.log(`${this.getName()} nie może użyć ${skill}`);
        }
    }
}

// Example Usage
const warrior = new WarriorClass("Warrior");
const mage = new MageClass("Mage");

warrior.useSkill(warrior, 'Slam'); // Warrior skill used 1 time
warrior.useSkill(warrior, 'Slam'); // Warrior skill used 2 times

mage.useSkill(warrior, 'Fireball'); // Mage skill used 1 time
mage.useSkill(warrior, 'Fireball'); // Mage skill used 2 times

// abstract class Character {
//     private name: string;
//     private _health: number;
//     protected type: CharacterType;

//     constructor(name: string, type: CharacterType, health: number = 100) {
//         this.name = name;
//         this.type = type;
//         this._health = health;
//     }

//     get health(): number {
//         return this._health;
//     }

//     set health(value: number) {
//         this._health = Math.max(0, Math.min(value, 100));
//         if (this._health === 0) {
//             console.log(`${this.name} umiera`);
//         }
//     }

//     getName(): string {
//         return this.name;
//     }

   
//     abstract useSkill(target: Character, skill: SkillType): void;

//     static performAction(actor: Character, target: Character, skill: SkillType) {
//         actor.useSkill(target, skill); 
//     }
// }


// class WarriorClass extends Character {
//     constructor(name: string) {
//         super(name, { action: 'Slam', type: 'attack', health: 10 });
//     }

//     useSkill(target: Character, skill: SkillType): void {
//         if (this.type.action === 'Slam' && skill === 'Slam') {
//             console.log(`${this.getName()} atakuje ${target.getName()} umiejętnością Slam!`);
//             target.health -= 15;
//             console.log(`${target.getName()} ma teraz ${target.health} punktów zdrowia.`);
//         } else {
//             console.log(`${this.getName()} nie może użyć umiejętności ${skill} - nie jest dostępna.`);
//         }
//     }
// }


// class MageClass extends Character {
//     private burnDamage: number = 0;

//     constructor(name: string) {
//         super(name, { action: 'Fireball', type: 'attack', health: 15 });
//     }

//     useSkill(target: Character, skill: SkillType): void {
//         if (this.type.action === 'Fireball' && skill === 'Fireball') {
//             console.log(`${this.getName()} rzuca Fireball na ${target.getName()}!`);
//             const baseDamage = 10;
//             target.health -= baseDamage + this.burnDamage;
//             this.burnDamage = Math.floor(baseDamage * 0.1);
//             console.log(`${target.getName()} ma teraz ${target.health} punktów zdrowia.`);
//         } else {
//             console.log(`${this.getName()} nie może użyć umiejętności ${skill} - nie jest dostępna.`);
//         }
//         if(target.health <= 0){
//             console.log(`${target.getName()} umiera`);
//         }
//     }
// }


// class HealerClass extends Character {
//     constructor(name: string) {
//         super(name, { action: 'Heal', type: 'heal', health: 10 });
//     }

//     useSkill(target: Character, skill: SkillType): void {
//         if (this.type.action === 'Heal' && skill === 'Heal') {
//             const healAmount = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
//             console.log(`${this.getName()} leczy ${target.getName()} umiejętnością Heal o ${healAmount} punktów zdrowia.`);
//             target.health += healAmount;
//             console.log(`${target.getName()} ma teraz ${target.health} punktów zdrowia.`);
//         } else {
//             console.log(`${this.getName()} nie może użyć umiejętności ${skill} - nie jest dostępna.`);
//         }
//     }
// }


//const warrior = new WarriorClass("Warrior");
// const mage = new MageClass("Mage");
// const healer = new HealerClass("Healer");

// Character.performAction(warrior, mage, 'Slam');   
// Character.performAction(mage, warrior, 'Fireball'); 
// Character.performAction(mage, warrior, 'Fireball'); 
// Character.performAction(healer, mage, 'Heal');    