"use strict";
let array = ["First", "Array", "With", true];
array.push(100);
console.log(array);
let array2 = [20, 10, 60, 40];
array2.sort((a, b) => b - a);
array2.push(2);
array2.unshift(70);
console.log(array2);
let array3 = ["Gustavo", "Giovana", "Guilherme", "Gabriel", "Giorno"];
array3.sort((a, b) => b.localeCompare(a));
console.log(array3);
let tupla = [10, "Gustavo", true];
let obj = {
    name: "Joao",
    age: 34,
    compliment: (n) => { console.log("Hello litte " + n); }
};
console.log(obj.name);
obj.compliment("Keverson");
