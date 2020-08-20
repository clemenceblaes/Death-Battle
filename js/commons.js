let _currentPlayer; 
let turn;
let currentChampionSelected;
$(document).ready(function(){ 
    switch(window.location.pathname) {
        case "/game2/html/champions.html":
            displayPlayableCharacters(); // When i go on the site, the html is add.
            
        $("#playbutton").hide(); // The button "Play" is hide when i go on the page. 
            _currentPlayer = 1;

        $("#player2").hide();
            break;
        case "/game2/html/games.html":
            _currentPlayer = 1;
            turn = 1;
            Main.startGame(); //Function that intialize the game.
            Weapon.displayWeapons(); //Function that show weapons's part on html page
            Player.showChampion(); // Function that show every player's champion.
            break;
    }
});