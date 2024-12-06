let text = "Hello my name is gustavo and now im going to show you a magic trick :)"

let [...p] = text.split(" ")
let phrase:string = ""
p.forEach((e)=>{
    phrase+=e + " "
})
console.log(phrase)