class Weapon {
    constructor (name, damage, avatar) {
        this.name = name; 
        this.damage = damage;
        this.avatar = avatar;
        
    }

    
    static randomWeaponBlock() { //Function that spawn random weapon on board from JSON file.
        
        $.getJSON("../json/weapons.json", (json) => {

            json.playableWeapons.forEach(weapons => {

                let weaponpositionx, weaponpositiony;

                do { 
                    weaponpositionx = Main.randomCase(0,9);
                    weaponpositiony= Main.randomCase(0,9);
                } while ((Board.board[weaponpositionx][weaponpositiony])); //Create new coords when case is already used.
                Board.board[weaponpositionx][weaponpositiony] = (new Weapon(weapons.name, weapons.damage, weapons.avatar)); // Add weapons on board.
                document.getElementById(weaponpositionx.toString() + weaponpositiony.toString()).style.backgroundImage = // Add weapons on html page.
                     `url('/game/css/img/${weapons.avatar}')`; 
                $("#"+ weaponpositionx.toString() + weaponpositiony.toString()).addClass("weapon"); // Set case as a weapon case.
                $("#"+weaponpositionx.toString() + weaponpositiony.toString()).removeClass("open");
            });
        });
    }

    static displayWeapons() {  // Display weapon part in html page for all weapons in json file

        $.getJSON("../json/weapons.json", (json) => {
            json.playableWeapons.forEach(weapons => {
                let weaponsIcon = 
                        "<div class=\"weaponsId\" id=\"weapons" + weapons.id + "\">"+
                            "<img src=\"../css/img/" + weapons.avatar + "\" class=\"weaponsImg\" alt=\"" + weapons.name + "\">"+
                                "<h2 class=\"weaponsName\">" + weapons.name + "</h2>" +
                                "<h3 class=\"weaponsDamage\">" + weapons.damage + "points de dégâts" +"</h3>"+
                        "</div>"
                        $('#weaponsList').append(weaponsIcon);       
            });
        });
    }
}

