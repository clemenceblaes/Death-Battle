function playerSelection(champion){
    if (_currentPlayer == 2 && sessionStorage["player1"] == champion.name) {
        alert("Ce personnage a déjà été pris, merci de choisir un autre champion !");
        return;
    }
    $('#champion' + currentChampionSelected).css("border",""); // The border is reset 
    
    $('#champion' + champion.name).css("border","solid 5px #918237"); // Champion border color's change
    currentChampionSelected = champion.name; // The champion is selectionned
}