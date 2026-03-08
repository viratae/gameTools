const form = (function formController() {
    const birds = document.querySelector('#birds');
    const bonus = document.querySelector('#bonus');
    const endOfRound = document.querySelector('#endOfRound');
    const eggs = document.querySelector('#eggs');
    const food = document.querySelector('#food');
    const tucked = document.querySelector('#tucked');
    const nectar = document.querySelector('#nectar');
    const changeWeightButton = document.querySelector('#changeWeightButton');
    const closeModal = document.querySelector('#closeModal');
    const modal = document.querySelector('.modal');
    const weightingForm = document.querySelector('#weightingForm');
    weightingForm.addEventListener('submit', (e) => {
        e.preventDefault();
            game1.scoreMultiplier = {
            birds: birds.value,
            bonus: bonus.value,
            endOfRound: endOfRound.value,
            eggs: eggs.value,
            food: food.value,
            tucked: tucked.value,
            nectar: nectar.value,
        }
        screen.render(game1);
        modal.classList.remove("show");
    })
    changeWeightButton .addEventListener('click', () => {
        modal.classList.add("show");
    });
    closeModal.addEventListener('click', () => {
        modal.classList.remove("show");
    });
    return {

    }
})();
// Player Object
class Player {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.scores = {
            birds:0,
            bonus: 0,
            endOfRound: 0,
            eggs: 0,
            food: 0,
            tucked: 0,
            nectar: 0,
        }
    }

    calculateTotal() {
        let total = 0;
        for(let key in this.scores) {
            if(key!= "total") {
                console.log(key);
                console.log(game1.scoreMultiplier[key]);
                total += (this.scores[key] * game1.scoreMultiplier[key]);
            }
        }
        return total;
    }
}
class Game {
    constructor() {
        this.players = [];
        this.nextId = 1;
    }
    addPlayer(player) {
        this.players.push(player);
    }
    createPlayer(name) {
        const player = new Player(name, this.nextId);
        this.players.push(player);
        this.nextId++;
        return player;
    }
    removePlayerById(id) {
        this.players = this.players.filter(function(player) {
            return player.id != id;
        })
    }
    scoreMultiplier = {
        birds:1,
        bonus: 1,
        endOfRound: 1,
        eggs: 1,
        food: 1,
        tucked: 1,
        nectar: 1,
    }
}
const game1 = new Game();
const game = (function gameController(game) {
    const addPlayerButton = document.querySelector('#addPlayerButton');
    addPlayerButton.addEventListener('click', () => {
        game.createPlayer("Player " + game.nextId);
        screen.render(game);
        console.log(game);
    });
    return {

    }
})(game1);
const screen = (function ScreenController() {
    const tableContainer = document.querySelector('#tableContainer');
    const table = document.querySelector('#table');
    const playerRow = document.querySelector('#playerRow');
    const category = ["birds", "bonus", "endOfRound", "eggs", "food", "tucked", "nectar"];
    const rows = {
        birds: document.querySelector("#birdScore"),
        bonus: document.querySelector("#bonusScore"),
        endOfRound: document.querySelector("#endOfRoundScore"),
        eggs: document.querySelector("#eggsScore"),
        food: document.querySelector("#foodScore"),
        tucked: document.querySelector("#tuckedScore"),
        nectar: document.querySelector("#nectarScore"),
    };
    function clearRow(row) {
        while (row.children.length > 1) {
            row.removeChild(row.lastChild);
        }
    }       
    function render(game) {
        clearRow(playerRow);
        for(let key in rows) {
            clearRow(rows[key]);
        }
        clearRow(totalScore);
        game.players.forEach(player => {
            let totalCell = document.createElement("td");
            //Creates heading for each player with their name
            const th = document.createElement("th");
            const textInput = document.createElement("input");
            textInput.setAttribute('type', 'text');
            textInput.setAttribute('value', player.name);
            textInput.addEventListener('input', () => {
                player.name = textInput.value;
            });
            th.appendChild(textInput);
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "x";
            th.appendChild(deleteButton);
            playerRow.appendChild(th);
            deleteButton.addEventListener("click", () => {
                game.removePlayerById(player.id);
                render(game);
            })
            category.forEach(score => {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.setAttribute('type', 'number');
                input.setAttribute('value', player.scores[score]);
                td.appendChild(input);
                td.classList.add(player.id);
                input.addEventListener("input", () => {
                    player.scores[score] = Number(input.value);
                    totalCell.textContent = player.calculateTotal();
                    console.log(player.name, player.scores, player.calculateTotal());
                });
                rows[score].appendChild(td);
                
            })
            totalCell.textContent = player.calculateTotal();
            totalScore.appendChild(totalCell);
            
        });
        
    }
    return {
        render
    }
})();
game1.createPlayer("Player 1");
game1.createPlayer("Player 2");
screen.render(game1);
