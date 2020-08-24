"use strict";

class Player  { // Class that store player's patterns. 
    constructor (name, position, avatar, weapon, health, damage) {
        this.name = name;
        this.position = position;
        this.avatar = avatar;
        this.weapon = weapon;
        this.health = health;
        this.damage = damage;
        
    }

    static showChampion() { //Function that show each player's board.
        $(document).ready(function() { 

            let player1 = sessionStorage["player1"];

            let player2 = sessionStorage["player2"];


                $.getJSON("../json/champions.json", function(json) {
                    json.playableCharacters.forEach(champion => {
                        const playerOne = 1;
                        const playerTwo = 2;

                        if (player1 === champion.name) {
                            $("#playernumber1").append("Joueur " + playerOne);
                            $("#playerchampion1").append(champion.name);
                            $("#player1avatar").attr("src", "/game/css/img/" + champion.avatar);
                            $("#playerweapons1").append();
                        }

                        else if (player2 === champion.name) {
                                $("#playernumber2").append("Joueur " + playerTwo);
                                $("#playerchampion2").append(champion.name);
                                $("#player2avatar").attr("src", "/game/css/img/" + champion.avatar);
                                $("#playerweapons2").append();
                        }
                    })
                })
        });
    }


    static spawnPlayer() { // Function that random spawn player's champion. 

        // Player 1 spawn.
        let player1PosX, player1PosY, player1PosXY, player2PosX, player2PosY, player2PosXY;
            do {
                player1PosX = Main.randomCase(0,9); // Random position X.
                player1PosY = Main.randomCase(0,9); // Random position Y.

                player1PosXY = player1PosX.toString() + player1PosY.toString(); // Random Position XY.

            } while ((Board.board[player1PosX][player1PosY]));

            // We create the player on the javascript table's case. 
            Board.board[player1PosX][player1PosY] = Store.player1 = new Player (sessionStorage.getItem("player1"),
            player1PosXY, sessionStorage.getItem("player1"), new Weapon("Lame de Doran", 10, "doran.png"), 100, 10); 

            // And add the avatar on the case.     
            document.getElementById(player1PosXY).style.backgroundImage = `url('/game2/css/img/${Store.player1.avatar}.png')`;
        
            //Player2 spawn.
            do {
                player2PosX = Main.randomCase(0,9);
                player2PosY = Main.randomCase(0,9);

                player2PosXY = player2PosX.toString() + player2PosY.toString();

            } 
            
            //Loop that create a player, only if there isn't another player around.
            while ((Board.board[player2PosX][player2PosY] || player2PosX == player1PosX + 1 || player2PosX == player1PosX - 1 ||
                player2PosY == player1PosY + 1 || player2PosY == player1PosY -1)); 

            Board.board[player2PosX][player2PosY] = Store.player2 = new Player (sessionStorage.getItem("player2"), player2PosXY,  
                sessionStorage.getItem("player2"), new Weapon("Lame de Doran", 10, "doran.png"), 100, 10); 

            document.getElementById(player2PosXY).style.backgroundImage = `url('/game2/css/img/${Store.player2.avatar}.png')`;
        
        // Add the base weapon to players, and add the class "player" to the case in order to drag.
        // Remove the "open" class for player's case.
        $("#" + player1PosXY).addClass("player1Case");
        $("#" + player1PosXY).removeClass("open");
        document.getElementById("playerweapons1").style.backgroundImage = `url('/game2/css/img/doran.png')`;
        $("#" + player2PosXY).addClass("player2Case");
        $("#" + player2PosXY).removeClass("open");
        document.getElementById("playerweapons2").style.backgroundImage = `url('/game2/css/img/doran.png')`;
         
    } 
}
