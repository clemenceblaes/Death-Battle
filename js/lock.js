function lock(){  //function that store the selected champion 
    if (!currentChampionSelected){
        // If the player click on the lock button without chosing champion -> alert message.
        alert("Choisissez le champion de votre choix."); 
        return;
    }
    if (_currentPlayer == 1) {
        sessionStorage["player1"] = currentChampionSelected;  //Store the champion for player 1
        $('#champion' + currentChampionSelected).css("border","inset 7px #BD1C1C"); // Red border for player 1
        _currentPlayer = 2;
        currentChampionSelected = null;  // We empty the temporary variable for storage a champion.
        $("#player1").hide();
        $("#player2").show(); //Change the name player 

    } else if (_currentPlayer == 2) {
        $('#champion' + currentChampionSelected).css("border","inset 7px #1B82E8"); // Blue border for player 2
        sessionStorage["player2"] = currentChampionSelected; //Store the champion for player 2 
        currentChampionSelected = null;

        if (_currentPlayer == 2 && sessionStorage["player2"]) {

            $('#lockbutton').click(function(){  //On click on card, we call the player selection method.
                window.location.replace('../html/games.html');
            });
        };
    };
}
