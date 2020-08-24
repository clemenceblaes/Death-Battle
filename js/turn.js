class Turn {

    static playerTurn(turn) { // Function that show which player has to play.

        if (turn % 2 == 0) { //If turn can be divide per 2, it's player 2 turn.
            _currentPlayer = 2;
            $("#player1turn").hide();
            $("#player2turn").show();
            $( ".player1Case" ).draggable({ 
                disabled: true
              });
              $( ".player2Case" ).draggable({ // Player can't drag his champion if it isn't his turn. 
                disabled: false
              });

        }
        if (turn % 2 == 1) { //If turn can't be divide per 2, it's player 1 turn.
            _currentPlayer = 1;
            $("#player2turn").hide();
            $("#player1turn").show();        
            $( ".player2Case" ).draggable({
                disabled: true
              });
              $( ".player1Case" ).draggable({
                disabled: false
              });
        } 
    }

    static moveOnBadCase(exID) {// function that respawn the player at the ex case if bad move is detected.
        alert("Déplacement non autorisé!");
        if (_currentPlayer == 1) {
            document.getElementById(exID).style.backgroundImage = `url('/game2/css/img/${Store.player1.avatar}.png')`;
        }
        else {
            document.getElementById(exID).style.backgroundImage = `url('/game2/css/img/${Store.player2.avatar}.png')`;
        }
    }

    static updatePlayerPosition(exID, newID) { // Function that update player's position.

        let newX, newY, exX, exY;

        //We keep the first and the second number from the HTML's ID.
        // We need them to find the case on our javascript table.
        newX = newID.substr(0,1); 
        newY = newID.substr(1,1); 
        exX = exID.substr(0,1);
        exY = exID.substr(1,1);

        // We add the avatar on the new ID
        if (_currentPlayer == 1) {
            document.getElementById(newID).style.backgroundImage = `url('/game2/css/img/${Store.player1.avatar}.png')`; 
        }
        else {
            document.getElementById(newID).style.backgroundImage = `url('/game2/css/img/${Store.player2.avatar}.png')`;
        }

        document.getElementById(exID).style.backgroundImage = `none`; // And remove avatar from the exID.
        this.SomethingHere(newX, newY, exX, exY); 
    }

    static SomethingHere(newX, newY, exX, exY, weaponHere) { //Function that check if there is a weapon on the case

        let somethingHere = Board.board[newX][newY];
        let player1ExWeapon, player2ExWeapon, playerNumber;
        let caseArray = [];

        if (somethingHere instanceof Weapon) {

            if (_currentPlayer == 1) { 
                playerNumber = Store.player1;
                player1ExWeapon = playerNumber.weapon;
                caseArray = [player1ExWeapon, playerNumber];
                document.getElementById("playerweapons1").style.backgroundImage = `url('/game2/css/img/${somethingHere.avatar}')`; // Show the weapon on the board. 
            }
            else if (_currentPlayer == 2) {
                playerNumber = Store.player2;
                player2ExWeapon = playerNumber.weapon;
                caseArray = [player2ExWeapon, playerNumber];
                document.getElementById("playerweapons2").style.backgroundImage = `url('/game2/css/img/${somethingHere.avatar}')`;             
            }

                weaponHere = caseArray.find(element => element instanceof Weapon);
                playerNumber.weapon = somethingHere; // Update the informations of the player with the new weapon.
                playerNumber.position = (newX + newY);
                Board.board[exX][exY] = null;
                Board.board[newX][newY] = caseArray;    
        }

        else {
        // Only update player's position.
            if (_currentPlayer == 1) { 
                Store.player1.position = (newX + newY);
                Board.board[exX][exY] = null;
                Board.board[newX][newY] = Store.player1;
            }
    
            else if (_currentPlayer == 2) {
                Store.player2.position = (newX + newY);
                Board.board[exX][exY] = null;  
                Board.board[newX][newY] = Store.player2;
            }
        }
        this.isSomeoneAround(newX, newY); //Function that check if antother player is around.        
    } 

    static isSomeoneAround(newX, newY) { //Function that check if antother player is around.

        // We store all case around the player.
        let currentPlayerPosRight = newX == 9 ? null : Board.board[parseInt(newX) + 1][parseInt(newY)];
        let currentPlayerPosLeft = newX == 0 ? null : Board.board[parseInt(newX) - 1][parseInt(newY)]; 
        let currentPlayerPosTop = newY == 9? null : Board.board[parseInt(newX)][parseInt(newY) + 1];
        let currentPlayerPosBottom = newY == 0? null : Board.board[parseInt(newX)][parseInt(newY) - 1]; 

        if ( currentPlayerPosLeft instanceof Player ||currentPlayerPosRight instanceof Player ||
            currentPlayerPosTop instanceof Player || currentPlayerPosBottom instanceof Player) { 
                // If a player is around, then the battle will running.
                alert("C'est l'heure du Du-du-du-du-du... DUEL !")
                Battle.battle();
            }
    }

    static playerBoardMoove() { //Function that check a turn.

        $(document).ready(function() {
            $(".player2Case").draggable({ // Only players are draggable.
    
            // Some options for the drag.
            helper: "clone",
            cursor: 'move',
            tolerance: 'fit',
            containment: '#board',
            refreshPositions: true,
            grid: [ 75, 75 ],
            revert: true, 
        })

            $(".player1Case").draggable({ // Only players are draggable.

                // Some options for the drag.
                helper: "clone",
                cursor: 'move',
                tolerance: 'fit',
                containment: '#board',
                refreshPositions: true,
                grid: [ 75, 75 ],
                revert: true, 
        })
    })
            this.playerTurn(turn); //Function that show the player allowed to play
            Draganddrop.dragAndDrop(); // Function that allow drag and drop.
    }
}