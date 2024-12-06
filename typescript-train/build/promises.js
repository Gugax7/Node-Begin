"use strict";
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p1 finished");
    }, 700);
});
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p2 finished");
    }, 1000);
});
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p3 finished");
    }, 500);
});
const promises = [p1, p2, p3];
const startTime1 = performance.now();
console.log("Process started...");
const mypromises = Promise.race(promises).then((data) => {
    console.log(data);
    console.log("All promises was completed");
});
console.log("Process finished!");
const endTime = performance.now();
const timeTaken = endTime - startTime1;
console.log(`Time taken: ${timeTaken.toFixed(2)} ms`);
const startTime2 = performance.now();
const g1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("g1 finished");
    }, 700);
});
const g2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("g2 finished");
    }, 1000);
});
const g3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("g3 finished");
    }, 500);
});
const resolveAll = Promise.race([g1, g2, g3]).then((data) => {
    console.log(data);
    var endTime = performance.now();
    var timeTaken = endTime - startTime2;
    console.log(`Time taken: ${timeTaken.toFixed(2)} ms`);
});
