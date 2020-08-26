class Draganddrop {

    static dragAndDrop() {

        let exID, newID;
        let possiblePosition = [];

        $(function () {            

            $(".player1Case, .player2Case").draggable({ // Only players are draggable.

                drag: function(){

                    for (var i = 0; i < 1; i++) {
                        // We store the ID where the player is before mooving. We'll calculate some new positions with.
                        exID = $(this).attr("id"); 

                        let weaponHere = Board.getWeaponAtPositionID(exID); 
                        //Function that check if there is a weapon on the exID case.

                        if (weaponHere) { // If there is a weapon, we'll show it on drag.
                                document.getElementById(exID.substr(0,1) + exID.substr(1,1) ).style.backgroundImage = `url('/game2/css/img/${weaponHere.avatar}')`;
                                console.log("pipi", exID, document.getElementById(exID.substr(0,1) + exID.substr(1,1)), `url('/game2/css/img/${weaponHere.avatar}.png)`);
                            }
                        

                        let modulloExID = Math.floor(parseInt(exID) / 10);
   
                        for (var direction = 0; direction <=3; direction++) { // Loop for each direction
                    
                            let isDirectionBlocked = false; 
                            let newPossiblePosition = null;
                            let directionValue;

                            switch (direction) {
                                case 0 : 
                                directionValue = 1; //Right direction
                                break;

                                case 1 : 
                                directionValue = -1; //Left direction
                                break;

                                case 2 :
                                directionValue = 10; //Top direction
                                break;

                                case 3 : 
                                directionValue = -10; //Bottom direction
                                break;

                            }

                            for (var i = 1; i <=3; i++ ) { //Loop for each case for each direction.
                                let calculation = (((parseInt(exID)) + (directionValue * i)) < 10 &&
                                    (parseInt(exID) + (directionValue * i)) > 0)  ? "0" + (parseInt(exID) + (directionValue * i)) : (parseInt(exID) + (directionValue * i)); 
                                    // The expression that calculate each case around the player's case. 
                

                                if ((direction == 0 && (parseInt(calculation / 10) == modulloExID) && !isDirectionBlocked) || 
                                    (direction == 1 && (parseInt(calculation / 10) == modulloExID) && !isDirectionBlocked) ||
                                     //Don't show case that are not on the same line, or that are blocked by wall. 
                                        (direction == 2  && !isDirectionBlocked) ||
                                            (direction == 3 && !isDirectionBlocked)) {
                                                newPossiblePosition = calculation.toString();
                                    if (newPossiblePosition > 0 && Board.board[newPossiblePosition.substr(0,1)][newPossiblePosition.substr(1,1)] instanceof Blocked || isDirectionBlocked) {
                                        isDirectionBlocked = true; //Make the direction block when we meet a wall
                                    }
                                    else {
                                        possiblePosition.push(calculation); //Push the case if conditions are met.
                                    }
                                }
                            }
                        }

                    possiblePosition.forEach(element => { 


                        let thisCase = element < 10 ? "0" + element : element;
                        //If the case is a weapon/player we don't attribute "grey" class.
                        if(Board.board[thisCase.toString().substr(0,1)][thisCase.toString().substr(1,1)] instanceof Weapon ||
                            Board.board[thisCase.toString().substr(0,1)][thisCase.toString().substr(1,1)] instanceof Player ) {
                        }
                        else {           
                            $("#"+ element).addClass("grey"); // Else we color the case in grey  
                            $("#"+ (element) + ".open").css('background', '#B8B7AE'); //Show with grey color which case are possible.
                        }
                    }); 
                    }       
                }
            });       

            $(".open, .weapon").droppable({

                over: function(exID) {
                    newID = $(this).attr("id");

                    // If player is over another position that 
                    let isPossiblePosition = possiblePosition.find(element => element == parseInt(newID));
                        if (isPossiblePosition == parseInt(newID)) {
                        }            
                        else if (isPossiblePosition != parseInt(newID)) {
                            alert("Déplacement non autorisé!");
                            Turn.playerBoardMoove(); // Re-start drag on drop for this turn.
                        }
                },

                drop: function(e, ui) {
                    let a = ui.helper.clone();
                    ui.helper.remove();
                    a.draggable({
                        helper: 'clone',
                        containment: '#board',
                        tolerance: 'fit',
                        revert : true})

                        let isPossiblePosition = possiblePosition.find(element => element == parseInt(newID)); 
                        //We check if the new case is a possible case.

                        if (isPossiblePosition) { // If the new case is possible... 
                            possiblePosition.forEach(element => 
                                $("#" + (element) + ".grey").css('background', 'none')); // Delete all grey (color) cases.  
                                $(".grey").removeClass("grey"); //Remove all "grey" class on cases.
                    
                            possiblePosition.length = 0; //Reset the table with possible positions.
                            Turn.updatePlayerPosition(exID, newID); 
    
                            if(_currentPlayer == 1) {
                                $("#" + newID).addClass("player1Case"); //Add class "player" that make possible to drag on the new case.
                                $("#" + newID).removeClass("open"); // Remove "open" class on the new case.
                                $("#" + exID).removeClass("player1Case"); //Remove class "player" that make possible to drag on the ex case.
                                $("#" + exID).addClass("open"); // Add the "open" class on the ex case.
                            }
                            else {
                                $("#" + newID).addClass("player2Case");
                                $("#" + newID).removeClass("open");
                                $("#" + exID).removeClass("player2Case");
                                $("#" + exID).addClass("open"); 
                            }

                            if(Board.board[exID.substr(0,1)][exID.substr(1,1)] == null ) { 
                                //If there is nothing on the ex case, no background.
                                document.getElementById(exID).style.backgroundImage = "none";
                            }

                            turn++; // Next Player                  
                            Turn.playerBoardMoove(); // New drag and drop.     
                        }           

                    else {
                        Turn.moveOnBadCase(exID); // function that repop the player at the ex case.
                        Turn.playerBoardMoove(); // New drag and drop.
                    }
                }
            });

            $(".bloked").droppable({ // If player drop on a wall, alert and repop at ex position.
                drop: function() {
                    alert("Vous ne pouvez vous déplacer sur un mur !");
                }
            })
        });  
    }
}