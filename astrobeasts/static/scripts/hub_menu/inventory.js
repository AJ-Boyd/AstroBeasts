export class InventoryScene extends Phaser.Scene {
    constructor() {
        super('LoadInventory');
    }

    preload() {
        // load all possible inventory images even if user doesn't have them at the moment
        this.load.image('skol', 'static/assets/Objects/skol.png');
        this.load.image('tarkeel', 'static/assets/Objects/tarkeel.png');
        this.load.image('bg', 'static/assets/Backgrounds/inventory.png');
        this.load.image('cookies', 'static/assets/Objects/cookies.png');
        this.load.image('atk_potion', 'static/assets/Objects/atk_potion.png');
        this.load.image('def_potion', 'static/assets/Objects/def_potion.png');
    }

    create() {
        const bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);

        let itemsText = this.add.text(((87.4 / 2) + 38.5) - 5 , ((164.1 / 2) + 34.7) - 50, "Items", {font: '25px', color: '#000'})
        
        let beastsText = this.add.text(((87.4 / 2) + 38.5) - 10 , ((164.1 / 2) + 168.9) - 65, "Astro\nbeasts", {font: '25px', color: '#000'})

        let movesText = this.add.text(((87.4 / 2) + 38.5) - 4 , ((164.1 / 2) + 303.2) - 50, "Moves", {font: '25px', color: '#000'})
        
        itemsText.setInteractive();
        beastsText.setInteractive();
        movesText.setInteractive();

        const margin = 10; 
        const xPosition = margin;
        const yPosition = this.cameras.main.height - margin;

        this.equippedText = this.add.text(xPosition, yPosition, '', { fontSize: '16px', color: '#fff' }).setOrigin(0, 1);
       

    
        itemsText.on('pointerdown', () => {
            this.updateInventoryDisplay('inventory');
        });
    
        beastsText.on('pointerdown', () => {
            this.updateInventoryDisplay('astrobeasts');
        });

        movesText.on('pointerdown', () => {
            this.updateInventoryDisplay('moves');
        });
    
        this.createScrollableInventory();

        // default
        this.updateInventoryDisplay('inventory');

        //loop through inventory global variable to print each item name, image, description, quantity(calculate this)
        const backButtonX = this.cameras.main.width - margin; 
        const backButtonY = this.cameras.main.height - margin;

       // next button to go to tutorial
       this.backButton = this.add.text(backButtonX, backButtonY, ' > Back', { color: '#0f0' })
            .setInteractive({ useHandCursor: true }) 
            .setOrigin(1, 1); 

        this.backButton.on('pointerdown', () => {
            this.scene.start('LoadHub'); 
        });
        
        this.backButton.on('pointerover', () => {
            this.backButton.setStyle({ fill: '#fff'}); // when you hover, changes to white
        });

        this.backButton.on('pointerout', () => {
            this.backButton.setStyle({ fill: '#0f0'}); 
        });

        this.updateEquippedText();
    }

    updateEquippedText() {
        const inventory = this.registry.get('inventory');
        const astrobeasts = this.registry.get('astrobeasts');
        const moves = this.registry.get('moves');

        const equippedItemsCount = inventory.filter(item => item.isEquipped).length;
        const equippedAstrobeastsCount = astrobeasts.filter(astrobeast => astrobeast.isEquipped).length;
        const equippedMovesCount = moves.filter(move => move.isEquipped).length;

        // update the text to show the current counts
        this.equippedText.setText(`Equipped: ${equippedItemsCount}/5 Items, ${equippedAstrobeastsCount}/4 AstroBeasts, ${equippedMovesCount}/5 Moves`);
    }
    createScrollableInventory() {
        const inventoryWidth = 400; 
        const inventoryHeight = 300; 
        const posX = 800 - inventoryWidth + 200; // start from the right edge of the white rectangle
        const posY = -160; 

        // create dom element in order to use a scrollbar while displaying inventory
        const inventoryHtml = `
            <div id="inventory-container" style="overflow-y: auto; width: ${inventoryWidth}px; height: ${inventoryHeight}px; background-color: rgba(0,0,0,0.8); color: white; padding: 10px;"></div>
        `;

        this.inventoryElement = this.add.dom(posX + (inventoryWidth / 2),  posY + (inventoryHeight / 2)).createFromHTML(inventoryHtml);
    }

    updateInventoryDisplay(type) {
        const content = this.registry.get(type) || [];
        const inventoryContainer = this.inventoryElement.getChildByID('inventory-container');
        
        
        inventoryContainer.innerHTML = ''; //clear current content

        
        content.forEach(item => {   
            const imagePath = `static/assets/Objects/${item.key}.png`;  // image's path
            
            const itemElement = document.createElement('div'); // create div for each item in inventory
            itemElement.className = 'inventory-item'; // for css
            

            // the text displayed with each item
            itemElement.innerHTML = `
                <img src="${imagePath}" alt="${item.name}">
                <span>${item.name} - Quantity: ${item.quantity}<br>${item.description}</span>
            `;
            // equip/unequip button
            itemElement.innerHTML += `<button class="equip-btn" data-key="${item.key}">${item.isEquipped ? 'Unequip' : 'Equip'}</button>`;

           //append new item div to container
            inventoryContainer.appendChild(itemElement);
            const equipButton = itemElement.querySelector('.equip-btn');
            equipButton.addEventListener('click', (event) => {
            this.toggleEquip(item.key, type); // equip toggle
        });
    });
    }

    toggleEquip(key, type) {
        const list = this.registry.get(type);
        const item = list.find(item => item.key === key);

        // do not exceed limit
        if (!item.isEquipped && ((type === 'inventory' && list.filter(item => item.isEquipped).length > 5) ||
            (type === 'astrobeasts' && list.filter(item => item.isEquipped).length > 4) || 
            (type === 'moves' && list.filter(item => item.isEquipped).length > 5))) {
            alert('Max capacity reached.');
            return;
        }

        item.isEquipped = !item.isEquipped;// change equipped status
        this.registry.set(type, list); // update the registry

        this.updateInventoryDisplay(type); //refresh display
        this.updateEquippedText();
    }
}