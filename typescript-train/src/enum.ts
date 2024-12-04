enum days{
    sunday = 0,
    monday = 1,
    tuesday = 2,
    wednesday = 3,
    thursday = 4,
    friday = 5,
    saturday = 6
}

console.log(days.thursday)
console.log(days["sunday"])
console.log(days[3])

const d = new Date()
console.log(d.getDate())