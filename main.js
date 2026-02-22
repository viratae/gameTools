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
                total += this.scores[key];
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
    removePlayerByID(id) {
        this.players = this.players.filter(function(player) {
            return player.id != id;
        })
        
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
        //Object.values(rows).forEach(clearRow);
        clearRow(totalScore);
        game.players.forEach(player => {
            let totalCell = document.createElement("td");
            //Creates heading for each player with their name
            const th = document.createElement("th");
            th.textContent = player.name;
            playerRow.appendChild(th);
            category.forEach(score => {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.setAttribute('type', 'number');
                input.setAttribute('value', 0);
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
// game1.createPlayer("p1");
// game1.createPlayer("p2");
// game1.createPlayer("p3");
// game1.createPlayer("p4");
// console.log(game1);
// console.log(game1.players);
screen.render(game1);
// game1.removePlayerByID(1);
// console.log(game1);