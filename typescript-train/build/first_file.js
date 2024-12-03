"use strict";
const name1 = "Gustavo";
const course = "CFBCursos";
console.log(name1 + " " + course);
class Course {
    strength = null;
    speed = null;
    constructor(strength, speed) {
        this.strength = strength;
        this.speed = speed;
    }
}
let c1 = new Course(10, 10);
console.log(c1.speed + " " + c1.strength);
