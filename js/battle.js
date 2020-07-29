"use strict";

function battle() {
    
    let round = 1;
    
    $("#board").load("fight.html", function() {
        $("#player1score").text(Store.player1.health);
        $("#player2score").text(Store.player2.health);     
        roundGame();//Function to choice if we attack or defend
    })
}

function roundGame() {

        $("#atkp1").click(function () {

            Store.player1Choice = 1; // 1 = atk
            Store.player1Played = 1; // 1 = player has made a choice
            if (Store.player1Played == 1 && Store.player2Played == 1) 
            //Function score only if player 1 and 2 has made a choice (Playerplayed = 1).
            {
                fightScore();
            }
        })

        $("#defp1").click(function () {

            Store.player1Choice = 2; // 2 = def
            Store.player1Played = 1;
            if (Store.player1Played == 1 && Store.player2Played == 1)
            {
                fightScore();
            }
        })

        $("#atkp2").click(function () {

            Store.player2Choice = 1;
            Store.player2Played = 1;
            if (Store.player1Played == 1 && Store.player2Played == 1)
            {
                fightScore();
            }
        })
    
        $("#defp2").click(function () {

            Store.player2Choice = 2;
            Store.player2Played = 1;
            if (Store.player1Played == 1 && Store.player2Played == 1)
            {
                fightScore();
            }
        })
}

function getTargetAgressor() { //Function that initialize who's the target, and the agressor.

    if (_currentPlayer == 1) { 
        Store.agressor = Store.player1;
        Store.target = Store.player2;
    }

    else if (_currentPlayer == 2) {
        Store.agressor = Store.player2;
        Store.target = Store.player1;
    }
}

function updatePV() {

    if (_currentPlayer == 1) { 
        $("#player2score").text(Store.target.health);
        $("#player1score").text(Store.agressor.health); 
    }

    else if (_currentPlayer == 2) {
        $("#player1score").text(Store.target.health);
        $("#player2score").text(Store.agressor.health); 
    }

    Store.player2Played = 0;
    Store.player1played = 0;
}

function fightScore() {

    //If a player select Defend, Agressor damages are divided per 2.

    getTargetAgressor(); //Function that initialize who's the target, and the agressor.

    if (Store.player1Choice == 1 && Store.player2Choice == 1) { // Player1 & Player2 = Attack

        Store.target.health = (parseInt(Store.target.health) - parseInt(Store.agressor.damage));
        Store.agressor.health = (parseInt(Store.agressor.health) - parseInt(Store.target.damage));
        updatePV();
        updatePlayerPV();
    }

    else if (Store.player1Choice == 1 && Store.player2Choice == 2) { //Player1 Attack & Player2 Defend
        if (_currentPlayer == 1) {
            Store.target.health = (parseInt(Store.target.health) - ((parseInt(Store.target.damage))/2));
            Store.agressor.health = parseInt(Store.agressor.health);
            updatePV();
            updatePlayerPV();
        }
        else if (_currentPlayer == 2) {
            Store.agressor.health = (parseInt(Store.agressor.health) - ((parseInt(Store.target.damage))/2));
            Store.target.health = parseInt(Store.target.health);
            updatePV();
            updatePlayerPV();
        }
    }

    else if (Store.player1Choice == 2 && Store.player2Choice == 1) { // Player1 Defend & Player2 Attack
        if (_currentPlayer == 1) {
            Store.target = parseInt(Store.target.health);
            Store.agressor.health = parseInt(Store.agressor.health) - (parseInt(Store.target.damage)/2);
            updatePV();
            updatePlayerPV();
        }
        else if (_currentPlayer == 2) { 
            Store.agressor.health = parseInt(Store.target.health);
            Store.target.health = parseInt(Store.agressor.health) - (parseInt(Store.target.damage)/2);
            updatePV();
            updatePlayerPV();
        }
    }

    else if (Store.player1Choice == 2 && Store.player2Choice == 2) { //player1 & Player2 = Defend
            Store.target.health = parseInt(Store.target.health);
            Store.agressor.health = parseInt(Store.agressor.health);
            updatePV();
            updatePlayerPV();
    }

    gameOver(); //Function that check if someone is dead and show the winner.
}

function updatePlayerPV() { //Function that animate the player1's health after a round.

    $("#player1score, #player2score").each(function () { // Update.player1.pv valeur d'avant et après. Petit calcul pour que la valeur d'avant passe à la valeur d'après avec des steps. (now = 0-100)
    // newhealth * now  / 100 + previoushealth * (100-now) / 100 dans maths ceil.
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.floor(now));
            }
        });
    })
}

function gameOver() { //Function that check if someone's pv are null and claim the winner

    if (Store.newPlayer1Health == 0 || Store.newPlayer2Health === 0) {
        $("#board").load("winner.html", function() {
            if (Store.newPlayer1Health === 0) {
                $("#player1Win").hide();
                $("#player2Win").show();
                $("playerIcon").css('background',"url(../css/img/" + Store.player2.avatar);
            }
            else if (Store.newPlayer2Health === 0) {
                $("#player1Win").show();
                $("#player2Win").hide();
                $("playerIcon").css('background',"url(../css/img/" + Store.player1.avatar);
            }                 
        })
    }
}