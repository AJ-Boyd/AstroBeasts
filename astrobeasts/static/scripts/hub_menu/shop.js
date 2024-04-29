import * as WebFontLoader from '../webfontloader.js'
export class ShopScene extends Phaser.Scene {
    constructor() {
        super('LoadShop');
    }

    preload() {
        // Load all possible inventory images even if user doesn't have them at the moment
        this.load.image('bgShop', '/static/assets/Backgrounds/bgShopFinal2.png');
    }

    create() {
        
        // Background Image
        const bgShop = this.add.image(0, 0, 'bgShop').setOrigin(0, 0);

        // Shop Title
        // center of screen horizontally (x axis)
         const centerX = this.cameras.main.width / 2;
        const intro = this.add.text(centerX, 60, 'Welcome to the Shop!', {font: '18px', color: 'White', align: 'center'}).setOrigin(0.5, 0.5);

        // 3 Menu Choices that bring up menus (scenes)
        let ItemsChoice = this.add.text(100, 90, 'Items', {font: '18px', color: '#FF2222' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.updateShopDisplay('shop_items'))
            .on('pointerover', () => {
                ItemsChoice.setStyle({ color: 'white'}); // when you hover, changes to white
            })
            .on('pointerout', () => {
                ItemsChoice.setStyle({ fill: '#FF2222'}); 
            });
    ;
        let AstrobeastChoice = this.add.text(325, 90, 'AstroBeasts', {font: '18px', color: 'DodgerBlue' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.updateShopDisplay('shop_astrobeasts'))
            .on('pointerover', () => {
                AstrobeastChoice.setStyle({ color: 'white'}); // when you hover, changes to white
            })
            .on('pointerout', () => {
                AstrobeastChoice.setStyle({ color: 'DodgerBlue'}); 
            });
        let MovesChoice = this.add.text(600, 90, 'Moves', {font: '18px', color: 'Green' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.updateShopDisplay('shop_moves'))
            .on('pointerover', () => {
                MovesChoice.setStyle({ color: 'white'}); // when you hover, changes to white
            })
            .on('pointerout', () => {
                MovesChoice.setStyle({ color: 'Green'}); 
            });
        let BalanceText = this.add.text(520, 270, 'Balance', {font: '22px', color: 'White' })
        //let currCost = this.registry.values.cost
        
        // Margin
        const margin = 10;

        // Wallet Text X,Y Position 
        const xPosition = this.cameras.main.width - 50
        const yPosition = this.cameras.main.height - 270;
        this.walletText = this.add.text(xPosition, yPosition, '', { fontSize: '19px', color: '#fff' }).setOrigin(1, 1);
        
    
        // Scrollable Inventory
        this.createScrollableInventory();

        // default
        this.updateShopDisplay('shop_items');

        //loop through inventory global variable to print each item name, image, description, quantity(calculate this)
        const backButtonX = this.cameras.main.width - margin; 
        const backButtonY = this.cameras.main.height - margin;

        // next button to go to tutorial
        this.backButton = this.add.text(backButtonX, backButtonY, ' > Back', { color: '#0f0' })
            .setInteractive({ useHandCursor: true }) 
            .setOrigin(1, 1); 
        this.backButton.on('pointerdown', () => {
            console.log('Current inventory state before leaving Shop:', this.registry.get('inventory_moves'));
            this.scene.start('LoadHub'); 
        });
        this.backButton.on('pointerover', () => {
            this.backButton.setStyle({ fill: '#fff'}); // when you hover, changes to white
        });
        this.backButton.on('pointerout', () => {
            this.backButton.setStyle({ fill: '#0f0'}); 
        });

        // below is using the webfontloader module to use external fonts for the scene
        WebFontLoader.default.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                ItemsChoice.setFontFamily('"Press Start 2P"')
                AstrobeastChoice.setFontFamily('"Press Start 2P"')
                MovesChoice.setFontFamily('"Press Start 2P"')
                this.backButton.setFontFamily('"Press Start 2P"')
                BalanceText.setFontFamily('"Press Start 2P"')
                intro.setFontFamily('"Press Start 2P"')
                this.walletText.setFontFamily('"Press Start 2P"')
                
            }
        }) 

        // Update the Equipped Text
        this.updateEquippedText();


    }
    
    updateEquippedText() {
        const Wallet = this.registry.get('player').getCredits();
        this.walletText.setText(`${Wallet} Credits`);
        // below is using the webfontloader module to use external fonts for the scene
        WebFontLoader.default.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                this.walletText.setFontFamily('"Press Start 2P"')
            }
        }) 
    }
    createScrollableInventory() {
        const inventoryWidth = 451; 
        const inventoryHeight = 399; 
        const posX = 620 - inventoryWidth + 200; // start from the right edge of the white rectangle
        const posY = -129; 

        // create dom element in order to use a scrollbar while displaying inventory
        const inventoryHtml = `
            <div id="inventory-container" style="overflow-y: auto; width: ${inventoryWidth}px; height: ${inventoryHeight}px; background-color: rgba(0,0,0,0.8); color: white; padding: 10px;"></div>
        `;

        this.inventoryElement = this.add.dom(posX + (inventoryWidth / 2),  posY + (inventoryHeight / 2)).createFromHTML(inventoryHtml);
    }

    updateShopDisplay(type) {
        this.currentShopType = type; 
        const content = this.registry.get(type) || [];
        const inventoryContainer = this.inventoryElement.getChildByID('inventory-container');
    
        // Clear current content without removing the DOM element
        inventoryContainer.innerHTML = '';
    
        // Rebuild the inventory display
        content.forEach(item => {   
            const imagePath = `static/assets/Objects/${item.key}.png`;  // Image's path
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
    
            itemElement.innerHTML = `
                <img src="${imagePath}" alt="${item.name}">
                <span>${item.name} - Quantity: ${item.quantity}<br>${item.description}</span>
                <button class="buy-btn" data-key="${item.key}" data-cost="${item.cost}">Buy (${item.cost} Credits)</button>
            `;
    
            inventoryContainer.appendChild(itemElement);
    
            // Re-attach event listener to the buy button
            const buyButton = itemElement.querySelector('.buy-btn');
            buyButton.addEventListener('click', () => {
                this.buyItem(item.key, item.cost, this.currentShopType);
            });
        });
}
    
    
    buyItem(key, cost, shopType) {
        let walletTotal = this.registry.get('player').getCredits();
    
        // Check if user has enough credits
        if (walletTotal < cost) {
            alert('Not enough credits.');
            return;
        }
    
        // Deduct the cost from the wallet
        walletTotal -= cost;
        this.registry.get('player').setCredits(walletTotal);
        this.updateEquippedText();

        const inventoryTypeMap = {
            'shop_items': 'inventory_items',
            'shop_astrobeasts': 'inventory_astrobeasts',
            'shop_moves': 'inventory_moves'
        };
        const inventoryType = inventoryTypeMap[shopType];

        if (inventoryType === 'inventory_moves') {
            console.log('Moves inventory before purchase:', this.registry.get(inventoryType));
        }
    
        // Get the current inventory and add the item
         // Add the item to the correct inventory
        let inventory = this.registry.get(inventoryType) || [];
        const newItem = { ...this.registry.get(shopType).find(item => item.key === key), quantity: 1 };
    
        // Update or add the item in inventory
        const existingItemIndex = inventory.findIndex(item => item.key === newItem.key);
        if (existingItemIndex !== -1) {
            inventory[existingItemIndex].quantity += 1;
        } else {
            inventory.push(newItem);
        }
    
        // Update the registry with the new inventory and refresh display
        this.registry.set(inventoryType, inventory);
    
        // Refresh the inventory display for the current shop type
        this.updateShopDisplay(shopType); 
        this.updateEquippedText(); // Refresh wallet display
       // this.createScrollableInventory(); // Refresh inventory display
        
    }
    
    toggleEquip(key, type) {
        const list = this.registry.get(type);
        const item = list.find(item => item.key === key);

        // do not exceed limit
        if (!item.isSelected && ((type === 'inventory' && list.filter(item => item.isSelected).length > 5) ||
            (type === 'astrobeasts' && list.filter(item => item.isSelected).length > 4) || 
            (type === 'moves' && list.filter(item => item.isSelected).length > 5))) {
            alert('Max capacity reached.');
            return;
        }

        item.isSelected = !item.isSelected;// change equipped status
        this.registry.set(type, list); // update the registry

        this.updateShopDisplay(type); //refresh display
        this.updateEquippedText();
    }
}