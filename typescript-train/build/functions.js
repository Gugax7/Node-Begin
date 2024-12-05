"use strict";
let user = {
    nome: "Gustavo",
    idade: 19,
    estudante: true
};
printuser();
function printuser(user = { nome: "Joao", idade: 2, estudante: false }, calvo) {
    console.log(user.nome);
    console.log(user.idade);
    console.log(user.estudante);
    console.log(calvo);
}
let soma = (num) => {
    let sum = 0;
    num.forEach((e, index, num) => {
        if (index == 4) {
            return 0;
        }
        sum += e;
        console.log(num);
    });
    return sum;
};
let number_array = [10, 20, 30, 40, 55];
console.log(soma(number_array));
function rest_soma(...n) {
    let sum = 0;
    for (let e of n) {
        sum += e;
    }
    return sum;
}
console.log(rest_soma(10, 20, 30, 40, 50));
