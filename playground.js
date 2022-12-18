var prompt = require('prompt');
//me test
const rows = 5;
const cols = 5;
let myArr = [];
const player = {
    name: "Yuval",
    currentPositionOnBoard: "0,0",
    currentHealthPoints: 100,
    powerRate: 30,
    isInBattle: false,
}
let pickUpItemsList = [];
pickUpItemsList.push({
    name: "plus 5 hp",
    hpChange: 5,
    powerChange: 0,
    currentPositionOnBoard: "1,2",
})

pickUpItemsList.push({
    name: "plus 10 attack",
    hpChange: 0,
    powerChange: 10,
    currentPositionOnBoard: "3,3",
})
let monstersList = [];
monstersList.push({
    name: "boo",
    currentHealthPoints: 70,
    powerRate: 150,
    currentPositionOnBoard: "2,2"
})
let playerPositionOnBoardI = player.currentPositionOnBoard.split(",")[0]
let playerPositionOnBoardJ = player.currentPositionOnBoard.split(",")[1]
let flag = 0;
function battle(index) {

    let counter = 0;
    while (player.currentHealthPoints >= 0 && monstersList[index].currentHealthPoints >= 0) {
        monstersList[index].currentHealthPoints -= player.powerRate;
        player.currentHealthPoints -= monstersList[index].powerRate;
        counter++;
        console.log("round " + (counter) + " Monster = " + monstersList[index].currentHealthPoints + " , Player = " + player.currentHealthPoints);
    }
    if (player.currentHealthPoints <= 0) {
        console.log("Monster " + monstersList[index].name + " won " + "game over!")
        flag = 1;
        return;
    } else {
        console.log("Player won")
    }
}


function checkBounds() {
    if (parseInt(playerPositionOnBoardI) < 0) {
        player.currentPositionOnBoard = "" + (parseInt(playerPositionOnBoardI) + 1) + "," + parseInt(playerPositionOnBoardJ) + "";
        playerPositionOnBoardI = player.currentPositionOnBoard.split(",")[0]
        playerPositionOnBoardJ = player.currentPositionOnBoard.split(",")[1]
        return false;
    }
    else if (parseInt(playerPositionOnBoardI) > (rows - 1)) {
        player.currentPositionOnBoard = "" + (parseInt(playerPositionOnBoardI) - 1) + "," + parseInt(playerPositionOnBoardJ) + "";
        playerPositionOnBoardI = player.currentPositionOnBoard.split(",")[0]
        playerPositionOnBoardJ = player.currentPositionOnBoard.split(",")[1]
        return false;
    }
    else if (parseInt(playerPositionOnBoardJ) > (cols - 1)) {
        player.currentPositionOnBoard = "" + parseInt(playerPositionOnBoardI) + "," + (parseInt(playerPositionOnBoardJ) - 1) + "";
        playerPositionOnBoardI = player.currentPositionOnBoard.split(",")[0]
        playerPositionOnBoardJ = player.currentPositionOnBoard.split(",")[1]
        return false;
    }
    else if (parseInt(playerPositionOnBoardJ) < 0) {
        player.currentPositionOnBoard = "" + parseInt(playerPositionOnBoardI) + "," + (parseInt(playerPositionOnBoardJ) + 1) + "";
        playerPositionOnBoardI = player.currentPositionOnBoard.split(",")[0]
        playerPositionOnBoardJ = player.currentPositionOnBoard.split(",")[1]
        return false;
    }
    return true;
}

function game() {
    //prompt.start();
    //console.log(player)
    prompt.get(['inputA'], function (err, result) {

        let numI = parseInt(playerPositionOnBoardI);
        let numJ = parseInt(playerPositionOnBoardJ);

        if (true) {

            if (result.inputA === 'w') {
                if (checkBounds()) {
                    player.currentPositionOnBoard = "" + (numI - 1) + "," + numJ + "";
                    playerPositionOnBoardI = player.currentPositionOnBoard.split(",")[0]
                    playerPositionOnBoardJ = player.currentPositionOnBoard.split(",")[1]
                    console.log("got in")

                    init();
                } else {
                    init();
                }
                //console.log(player)
            }
            else if (result.inputA === 's') {
                if (checkBounds()) {
                    player.currentPositionOnBoard = "" + (numI + 1) + "," + numJ + "";
                    playerPositionOnBoardI = player.currentPositionOnBoard.split(",")[0]
                    playerPositionOnBoardJ = player.currentPositionOnBoard.split(",")[1]

                    init();
                } else {
                    init();
                }
            }
            else if (result.inputA === 'd') {
                if (checkBounds()) {
                    player.currentPositionOnBoard = "" + (numI) + "," + (numJ + 1) + "";
                    playerPositionOnBoardI = player.currentPositionOnBoard.split(",")[0]
                    playerPositionOnBoardJ = player.currentPositionOnBoard.split(",")[1]


                    init();
                } else {
                    init();
                }
            }
            else if (result.inputA === 'a') {
                if (checkBounds()) {
                    player.currentPositionOnBoard = "" + (numI) + "," + (numJ - 1) + "";
                    playerPositionOnBoardI = player.currentPositionOnBoard.split(",")[0]
                    playerPositionOnBoardJ = player.currentPositionOnBoard.split(",")[1]


                    init();
                } else {
                    init();
                }
                console.log(player)
            }
            //init();
            game()
        }
    });

}


function init() {

    if (playerPositionOnBoardI == (rows - 1) && playerPositionOnBoardJ == (cols - 1)) {
        console.log("WINNER !!!");
    }
    for (let i = 0; i < rows; i++) {
        myArr[i] = [];

        for (let j = 0; j < cols; j++) {

            if (i == playerPositionOnBoardI && j == playerPositionOnBoardJ) {
                myArr[i][j] = "|PLAYER|";
            } else {
                myArr[i][j] = "|      |"
            }
            for (let k = 0; k < pickUpItemsList.length; k++) {
                const pickUpItemsI = pickUpItemsList[k].currentPositionOnBoard.split(",")[0];
                const pickUpItemsJ = pickUpItemsList[k].currentPositionOnBoard.split(",")[1];

                if (i == playerPositionOnBoardI && j == playerPositionOnBoardJ) {
                    myArr[i][j] = "|PLAYER|";

                }
                else if (i == pickUpItemsI && j == pickUpItemsJ) {
                    myArr[i][j] = "|  ?  |"
                }
                if (i == playerPositionOnBoardI && j == playerPositionOnBoardJ && i == pickUpItemsI && j == pickUpItemsJ) {
                    // pickUpItemsList[k]
                    console.log(player.currentHealthPoints, player.powerRate);

                    console.log('pick test')
                    player.currentHealthPoints += pickUpItemsList[k].hpChange
                    player.powerRate += pickUpItemsList[k].powerChange
                    console.log(player.currentHealthPoints, player.powerRate);
                    myArr[i][j] = "|     |"
                    pickUpItemsList[k].currentPositionOnBoard = "-1,-1"
                }


            }
            for (let m = 0; m < monstersList.length; m++) {
                const monsterI = monstersList[m].currentPositionOnBoard.split(",")[0];
                const monsterJ = monstersList[m].currentPositionOnBoard.split(",")[1];
                if (i == playerPositionOnBoardI && j == playerPositionOnBoardJ) {
                    myArr[i][j] = "|PLAYER|";

                } else if (i == monsterI && j == monsterJ) {
                    myArr[i][j] = "|   ?   |"
                }
                if (i == playerPositionOnBoardI && j == playerPositionOnBoardJ && i == monsterI && j == monsterJ) {
                    console.log('monster test')
                    battle(m)
                    if (flag == 1) {
                        return;
                    }
                    myArr[i][j] = "|PLAYER|"
                    monstersList[m].currentPositionOnBoard = "-1,-1"
                }
                //console.log(player.currentHealthPoints);
            }
        }
    }
    console.log(myArr);

}
init();
game();