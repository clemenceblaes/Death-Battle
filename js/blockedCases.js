class Blocked {
    constructor (position) {
        this.position = position;
    }

    static randomBlockCases() { // Function that spawn the blocked cases.
        let block = 0;
            do {
                let blockpositionx = Main.randomCase(0,9);
                let blockpositiony= Main.randomCase(0,9); //Generate a random position.
                    if (Board.board[blockpositionx][blockpositiony] == null) { //if the generate position is empty -> block case.
                        Board.board[blockpositionx][blockpositiony] = new Blocked (blockpositionx, blockpositiony);
                        block++;
                        document.getElementById(blockpositionx.toString()+ blockpositiony.toString()).style.backgroundImage = `url('/game/css/img/stone.png')`;
                        $("#"+blockpositionx.toString()+ blockpositiony.toString()).addClass("bloked"); //blocked css class can't be drag.
                        $("#"+blockpositionx.toString()+ blockpositiony.toString()).removeClass("open"); 
                        // remove open css class because we can't go on a block case
                    }
            }
            while (block < 12); // We want 12 blocked cases.
    }
}