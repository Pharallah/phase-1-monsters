/*
When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.

Executes showMonsters which fetches from API
*/

const monstersURL = 'http://localhost:3000/monsters'

document.addEventListener('DOMContentLoaded', showMonsters)

function showMonsters() {
    fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
    .then(res => res.json())
    .then(data => {
        data.forEach(monster => {
            const container = document.querySelector('#monster-container');
            const name = document.createElement('h3');
            const age = document.createElement('p');
            const description = document.createElement('p')
            name.innerText = monster.name;
            age.innerText = `Age: ${monster.age} years old`;
            description.innerText = `Description:
            ${monster.description}`;
            container.append(name, age, description);
        })
    })
     // EL on form for Monster creation
    const form = document.querySelector('#form');
    form.addEventListener('submit', createMonster)
        
        function createMonster(e) {
            e.preventDefault()
            let monsterObj = {
                name: e.target.name.value,
                age: e.target.age.value,
                description: e.target.description.value
            }
            postMonster(monsterObj)
        }

    // Constructs the Page Navigation Function
    const backButton = document.querySelector('#back');
    const forwardButton = document.querySelector('#forward');
    let currentPage = 1;

    backButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchPage(currentPage);
        }
    });

    forwardButton.addEventListener('click', () => {
        currentPage++;
        fetchPage(currentPage);
    });

    function fetchPage(currentPage) {
        // Clears current page
        const container = document.querySelector('#monster-container');
        container.innerHTML = "";
        const pageLimit = 50;

        //Constructs URL Page Turner
        fetch(`${monstersURL}/?_limit=${pageLimit}&_page=${currentPage}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(monster => {
                const name = document.createElement('h3');
                const age = document.createElement('p');
                const description = document.createElement('p')
                name.innerText = monster.name;
                age.innerText = `Age: ${monster.age} years old`;
                description.innerText = `Description:
                ${monster.description}`;
                container.append(name, age, description);
            })
        })
    }
}

// POSTs New Monster
function postMonster(monsterObj) {
    fetch(monstersURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            name: monsterObj.name,
            age: monsterObj.age,
            description: monsterObj.description
        })
    })
    .then(res => res.json())
    .then(data => {
        const container = document.querySelector('#monster-container');
        const name = document.createElement('h3');
        const age = document.createElement('p');
        const description = document.createElement('p')
            name.innerText = data.name;
            age.innerText = `Age: ${data.age} years old`;
            description.innerText = `Description:
            ${data.description}`;
            container.append(name, age, description);
    })
}










