let user = {
    nome: "Gustavo",
    idade: 19,
    estudante: true
}

printuser()

// ? says that i can put nothing there.
// i can define some standart to params, and with this if i dont put nothing on function call, it will use standart values.
function printuser(user:any = {nome: "Joao",idade: 2,estudante: false} ,calvo?:boolean){
    console.log(user.nome)
    console.log(user.idade)
    console.log(user.estudante)
    console.log(calvo)
}

let soma = (num:number[])=>{
    let sum:number = 0
    num.forEach((e,index,num)=>{
        if(index == 4){
            return 0
        }
        sum+=e
        console.log(num)
    })
    return sum
}

let number_array = [10,20,30,40,55]
console.log(soma(number_array))

