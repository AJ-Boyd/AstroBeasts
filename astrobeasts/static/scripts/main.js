import { MainMenuScene } from './start_menu/mainmenu.js';
import { NewGameScene, NameInputScene, PickYourStarterScene, TutorialScene } from './start_menu/newgame.js';
import { LoadGameScene } from './start_menu/loadgame.js';
import { OptionsScene } from './start_menu/options.js';
import { Preload } from './combat/preload.js';
import { CombatScene }  from './combat/combat.js';
import { HubScene } from './hub_menu/hub.js';
import { InventoryScene } from './hub_menu/inventory.js';
import { DojoScene } from './hub_menu/dojo.js';
import { ShopScene } from './hub_menu/shop.js';
import { TourneyScene } from './hub_menu/tourney.js';
import { FleeScene } from './combat_menu/flee.js';

// game configs
const config = {
    type: Phaser.AUTO,    
    width: 800,
    height: 600,
    parent: 'gameContainer',
    scene: [MainMenuScene, NewGameScene, NameInputScene, PickYourStarterScene, TutorialScene, LoadGameScene, OptionsScene, 
            HubScene, InventoryScene, DojoScene, ShopScene, TourneyScene, FleeScene],
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};

// create game instance using game config from above
const game = new Phaser.Game(config);

//If loading directly to combat, uncomment the following line:
// game.scene.start('Preload');