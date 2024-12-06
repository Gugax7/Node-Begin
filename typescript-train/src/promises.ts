
/*
const myPromise = new Promise((resolve,reject)=>{
    const nome = "Gustavo"
    for(let i = 0; i < 2000000000 ;i++);
    if(nome == "Gustavo"){
        resolve("User Gustavo found!")
    }else{
        reject("User not found!")
    }
})
myPromise.then((data)=>{
    console.log(data)
})
console.log("Log 2")

// Promise com catch

const myPromise2 = new Promise((resolve,reject)=>{
    const nome = "Joao"
    for(let i = 0; i < 2000000000 ;i++);
    if(nome === "Gustavo"){
        resolve("User Gustavo found!")
    }else{
        reject("User not found!")
    }
})
myPromise2.then((data)=>{
    console.log(data)
})
.catch((err)=>{
    console.log("An error has been occurred: " + err)
})
console.log("Log 2")

// Several Promises
const startTime = performance.now();
const p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("P1 finished")
    }, 700)
})
const p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("P2 finished")
    }, 1000)
})
const p3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("P3 finished")
    }, 500)
})

const resolveAll = Promise.all([p1,p2,p3]).then((data)=>{
    console.log(data)
    var endTime = performance.now(); // Record the end time
    var timeTaken = endTime - startTime; // Calculate the time difference
    console.log(`Time taken: ${timeTaken.toFixed(2)} ms`)
})


fetch("https://api.github.com/users/Gugax7", {
    method: 'GET',
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
}).then((response)=>{
    //console.log(typeof response)
    //console.log(response)
    return response.json()
}).then((response)=>{
    console.log("User name: " + response.name)
}).catch((err)=>{
    console.log("Error occurred: " + err)
})

*/
const p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("p1 finished")
    }, 700)
})
const p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("p2 finished")
    }, 1000)
})
const p3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("p3 finished")
    }, 500)
})

    const promises = [p1,p2,p3]

    const startTime1 = performance.now(); // Record the start time
  
    console.log("Process started...");
    
    const mypromises =  Promise.race(promises).then((data)=>{
        console.log(data)
        console.log("All promises was completed")
    })
    
    console.log("Process finished!");
  
    const endTime = performance.now(); // Record the end time
    const timeTaken = endTime - startTime1; // Calculate the time difference
    console.log(`Time taken: ${timeTaken.toFixed(2)} ms`)




// Several Promises
const startTime2 = performance.now();
const g1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("g1 finished")
    }, 700)
})
const g2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("g2 finished")
    }, 1000)
})
const g3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("g3 finished")
    }, 500)
})

const resolveAll = Promise.race([g1,g2,g3]).then((data)=>{
    console.log(data)
    var endTime = performance.now(); // Record the end time
    var timeTaken = endTime - startTime2; // Calculate the time difference
    console.log(`Time taken: ${timeTaken.toFixed(2)} ms`)
})
