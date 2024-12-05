"use strict";
const myPromise = new Promise((resolve, reject) => {
    const nome = "Gustavo";
    for (let i = 0; i < 2000000000; i++)
        ;
    if (nome == "Gustavo") {
        resolve("User Gustavo found!");
    }
    else {
        reject("User not found!");
    }
});
myPromise.then((data) => {
    console.log(data);
});
console.log("Log 2");
const startTime = performance.now();
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("P1 finished");
    }, 700);
});
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("P2 finished");
    }, 1000);
});
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("P3 finished");
    }, 500);
});
const resolveAll = Promise.all([p1, p2, p3]).then((data) => {
    console.log(data);
    var endTime = performance.now();
    var timeTaken = endTime - startTime;
    console.log(`Time taken: ${timeTaken.toFixed(2)} ms`);
});
fetch("https://api.github.com/users/Gugax7", {
    method: 'GET',
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
}).then((response) => {
    return response.json();
}).then((response) => {
    console.log("User name: " + response.name);
}).catch((err) => {
    console.log("Error occurred: " + err);
});
