
export class Weapon{

    protected damage: number
    protected can_kill: boolean
    protected name: string

    constructor(damage:number, can_kill:boolean, name:string = "Unnamed"){
        this.damage = damage
        this.can_kill = can_kill
        this.name = name
    }

    get weapon_name():string{
        return this.name
    }
    set weapon_name(name:string){
        this.name = name
    }

    toString(){
        return "Name:" + this.name + "\nCan kill: " + (this.can_kill? "Yes" : "No") + "\nDamage:" + this.damage
    }
}

export class Gun extends Weapon{
    private bullets: number
    private type_gun: string

    constructor(bullets:number, type_gun:string, damage:number, can_kill:boolean, name:string = "Unnamed"){
        super(damage,can_kill,name)
        this.bullets = bullets
        this.type_gun = type_gun
    }

    shoot(){
        this.bullets-=1
        console.log(`you've fired! ${this.bullets} bullets is left`)
    }

    toString(): string {
        return super.toString() + "\nBullets:" + this.bullets + "\nType of the gun:" + this.type_gun
    }
}

export class Sword extends Weapon{
    private weight: number
    private length: number
    private is_sharp: boolean

    constructor(weight:number,length:number,is_sharp:boolean,damage:number,can_kill:boolean,name:string = "Unnamed"){
        super(damage,can_kill,name)
        this.weight = weight
        this.length = length
        this.is_sharp = is_sharp
    }

    cut(){
        if(this.is_sharp){
            console.log("You've cutted and now your blade is blunt")
            this.is_sharp = false
        }
        else{
            console.log("You cant cut, your blade is blunt")
        }

    }

    sharpen(){
        if(!this.is_sharp){
            console.log("Wow, your sword is terrible, let me help you with this!")
            this.is_sharp = true
        }
        else{
            console.log("Your blade is already really sharp")
        }
    }

    toString(): string {
        return super.toString() + "\nWeigh:" + this.weight + "\nLength:" + this.length + "\nIs Sharp: " + (this.is_sharp ? "Yes" : "No")
    }


}

const master_sword = new Sword(10,10,true,200,true)

master_sword.weapon_name = "Master Sword"

console.log(master_sword.toString())