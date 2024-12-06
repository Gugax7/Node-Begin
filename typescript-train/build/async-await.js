"use strict";
function getUser(id) {
    return fetch(`https://reqres.in/api/users?id=${id}`)
        .then((data) => data.json())
        .catch((err) => {
        console.log("Error1: " + err);
    });
}
async function showUserName(id) {
    try {
        const user = await getUser(id);
        console.log("The user's name is: " + user.data.first_name);
    }
    catch (err) {
        console.log("Error2: " + err);
    }
}
showUserName(5);
