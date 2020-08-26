"use strict";

class Board {
    static boardCreation() {
        this.board = [];
        for(var x=0; x<10; x++) {
            this.board[x] = [];
            for(var y=0; y<10; y++) {
                this.board[x][y] = null; // We create a two dimension (10*10) table. 
            }
        }
    }

    static getWeaponAtPositionXY(x, y) { 
        //this method return the weapon if there is one on a case, this one use x and y coords.
        if (Board.board[x][y] instanceof Array) {
            return Board.board[x][y].find(element => element instanceof Weapon);
        }
        else {
            return undefined;
        }
    }

    static getWeaponAtPositionID(iD) { //this method return the weapon if there is one on a case, this one use id coords.
        return Board.getWeaponAtPositionXY(iD.substr(0,1), iD.substr(1,1));
    }
}

class Main {
    
    static randomCase(min, max) {  //method to return a random number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }   


    static startGame() { //Function that intialize the game.
        Board.boardCreation(); //Creation of the board in Javascript.
        Player.spawnPlayer(); //Spawn players on random position.
        Blocked.randomBlockCases(); // Spawn blocked cases on random position.
        Weapon.randomWeaponBlock(); // Spawn weapon cases on random position.
        Turn.playerBoardMoove(); //Allow player to move each turn.
    }

}

