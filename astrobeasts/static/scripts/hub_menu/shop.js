export class ShopScene extends Phaser.Scene {
    constructor() {
        super('LoadShop');
    }

    preload() {
        // Load all possible inventory images even if user doesn't have them at the moment
        this.load.image('bgShop', '/static/assets/Backgrounds/bgShopFinal.png');
    }

    create() {
        // Background Image
        const bgShop = this.add.image(0, 0, 'bgShop').setOrigin(0, 0);

        // Shop Title
        this.add.text(100, 40, 'Welcome to the Shop!\nBuy something to stimulate galactic economy growth :)', {font: '18px', color: 'White' });

        // 3 Menu Choices that bring up menus (scenes)
        let ItemsChoice = this.add.text(100, 90, 'Items', {font: '22px', color: '#FF2222' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.updateInventoryDisplay('inventory'));
        let AstrobeastChoice = this.add.text(325, 90, 'AstroBeasts', {font: '22px', color: 'DodgerBlue' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.updateInventoryDisplay('astrobeasts'));
        let MovesChoice = this.add.text(600, 90, 'Moves', {font: '22px', color: 'Green' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.updateInventoryDisplay('moves'));
        let BalanceText = this.add.text(520, 450, 'Balance', {font: '22px', color: 'White' })
        let currCost = this.registry.values.cost
        


        // Margin
        const margin = 10;

        // Wallet Text X,Y Position 
        const xPosition = this.cameras.main.width - 50
        const yPosition = this.cameras.main.height - 90;
        this.walletText = this.add.text(xPosition, yPosition, '', { fontSize: '22px', color: '#fff' }).setOrigin(1, 1);
        
    
        // Scrollable Inventory
        this.createScrollableInventory();
        // Shopping Cart
        this.createCart();

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

        // Update the Equipped Text
        this.updateEquippedText();
    }
    
    updateEquippedText() {
        // const inventory = this.registry.get('inventory');
        // const astrobeasts = this.registry.get('astrobeasts');
        // const moves = this.registry.get('moves');

        // const equippedItemsCount = inventory.filter(item => item.isEquipped).length;
        // const equippedAstrobeastsCount = astrobeasts.filter(astrobeast => astrobeast.isEquipped).length;
        // const equippedMovesCount = moves.filter(move => move.isEquipped).length;

        const Wallet = this.registry.get('walletTotal');
        // const walletAmt = Wallet.filter(wallet => wallet);

        // update the text to show the current counts
        // this.equippedText.setText(`Equipped: ${equippedItemsCount}/5 Items, ${equippedAstrobeastsCount}/4 AstroBeasts, ${equippedMovesCount}/5 Moves`);
        this.walletText.setText(`${Wallet} Credits`);
    }
    createScrollableInventory() {
        const inventoryWidth = 453; 
        const inventoryHeight = 395; 
        const posX = 622 - inventoryWidth + 200; // start from the right edge of the white rectangle
        const posY = -127; 

        // create dom element in order to use a scrollbar while displaying inventory
        const inventoryHtml = `
            <div id="inventory-container" style="overflow-y: auto; width: ${inventoryWidth}px; height: ${inventoryHeight}px; background-color: rgba(0,0,0,0.8); color: white; padding: 10px;"></div>
        `;

        this.inventoryElement = this.add.dom(posX + (inventoryWidth / 2),  posY + (inventoryHeight / 2)).createFromHTML(inventoryHtml);
    }

    // Right side Shopping Cart
    createCart() {
        const cartWidth = 258; 
        const cartHeight = 312; 
        const cartPosX = 792 - cartWidth + 200; // start from the right edge of the white rectangle
        const cartPosY = -85; 

        // create dom element in order to use a scrollbar while displaying inventory
        const cartHtml = `
            <div id="inventory-container" style="overflow-y: auto; width: ${cartWidth}px; height: ${cartHeight}px; background-color: rgba(0,0,0,0.8); color: white; padding: 10px;"></div>
        `;
        
        this.cartElement = this.add.dom(cartPosX + (cartWidth / 2),  cartPosY + (cartHeight / 2)).createFromHTML(cartHtml);
        this.cartElement.body = this.add.text(600, 350, 'BUY', {font: '36px', color: 'White' })              // Move this into createCart and alter funct
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                this.cartElement.body.setStyle({ fill: '#04AA6D'}); // When you hover, changes color
            })
            .on('pointerout', () => {
                this.cartElement.body.setStyle({ fill: 'White'}); // When unhover, changes color back
            })
            .on('pointerdown', () => {
                this.registry.values.walletTotal -= 50;
                this.updateEquippedText();
            });
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