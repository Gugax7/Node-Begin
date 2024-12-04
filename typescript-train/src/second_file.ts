let array:any[] = ["First", "Array", "With", true]

array.push(100)

console.log(array)

let array2:number[] = [20,10,60,40]
//reverse sort in numbers
array2.sort((a,b)=>b-a)
array2.push(2)
array2.unshift(70)

console.log(array2)

let array3 = ["Gustavo", "Giovana", "Guilherme", "Gabriel", "Giorno"]
//reverse sort in strings
array3.sort((a,b)=>b.localeCompare(a))

console.log(array3)

let tupla:readonly[number,string,boolean] = [10 ,"Gustavo", true]

let obj = {
    name: "Joao",
    age: 34,
    compliment:(n:string)=>{console.log("Hello litte " + n)}
}

console.log(obj.name)
obj.compliment("Keverson")