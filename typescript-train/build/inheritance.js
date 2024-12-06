"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sword = exports.Gun = exports.Weapon = void 0;
class Weapon {
    damage;
    can_kill;
    name;
    constructor(damage, can_kill, name = "Unnamed") {
        this.damage = damage;
        this.can_kill = can_kill;
        this.name = name;
    }
    get weapon_name() {
        return this.name;
    }
    set weapon_name(name) {
        this.name = name;
    }
    toString() {
        return "Name:" + this.name + "\nCan kill: " + (this.can_kill ? "Yes" : "No") + "\nDamage:" + this.damage;
    }
}
exports.Weapon = Weapon;
class Gun extends Weapon {
    bullets;
    type_gun;
    color;
    constructor(bullets, type_gun, damage, can_kill, name = "Unnamed", skinColor) {
        super(damage, can_kill, name);
        this.bullets = bullets;
        this.type_gun = type_gun;
        this.color = skinColor;
    }
    compliment() {
        console.log("Wow nice gun! the famous " + this.name);
    }
    shoot() {
        this.bullets -= 1;
        console.log(`you've fired! ${this.bullets} bullets is left`);
    }
    toString() {
        return super.toString() + "\nBullets:" + this.bullets + "\nType of the gun:" + this.type_gun;
    }
}
exports.Gun = Gun;
class Sword extends Weapon {
    weight;
    length;
    is_sharp;
    constructor(weight, length, is_sharp, damage, can_kill, name = "Unnamed") {
        super(damage, can_kill, name);
        this.weight = weight;
        this.length = length;
        this.is_sharp = is_sharp;
    }
    cut() {
        if (this.is_sharp) {
            console.log("You've cutted and now your blade is blunt");
            this.is_sharp = false;
        }
        else {
            console.log("You cant cut, your blade is blunt");
        }
    }
    sharpen() {
        if (!this.is_sharp) {
            console.log("Wow, your sword is terrible, let me help you with this!");
            this.is_sharp = true;
        }
        else {
            console.log("Your blade is already really sharp");
        }
    }
    toString() {
        return super.toString() + "\nWeigh:" + this.weight + "\nLength:" + this.length + "\nIs Sharp: " + (this.is_sharp ? "Yes" : "No");
    }
}
exports.Sword = Sword;
const master_sword = new Sword(10, 10, true, 200, true);
const machine_gun = new Gun(30, "Heavy", 3, true, "Soul eater", "blue");
master_sword.weapon_name = "Master Sword";
console.log(master_sword.toString());
