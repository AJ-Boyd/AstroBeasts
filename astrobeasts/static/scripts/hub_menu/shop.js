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
            .on('pointerdown', () => this.updateShopDisplay('shop_items'));
        let AstrobeastChoice = this.add.text(325, 90, 'AstroBeasts', {font: '22px', color: 'DodgerBlue' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.updateShopDisplay('shop_astrobeasts'));
        let MovesChoice = this.add.text(600, 90, 'Moves', {font: '22px', color: 'Green' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.updateShopDisplay('shop_moves'));
        let BalanceText = this.add.text(520, 450, 'Balance', {font: '22px', color: 'White' })
        //let currCost = this.registry.values.cost
        
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
        this.updateShopDisplay('shop_items');

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
        const Wallet = this.registry.get('walletTotal');
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
        let walletTotal = this.registry.get('walletTotal');
    
        // Check if user has enough credits
        if (walletTotal < cost) {
            alert('Not enough credits.');
            return;
        }
    
        // Deduct the cost from the wallet
        walletTotal -= cost;
        this.registry.set('walletTotal', walletTotal);
        this.updateEquippedText();

        const inventoryTypeMap = {
            'shop_items': 'inventory_items',
            'shop_astrobeasts': 'inventory_astrobeasts',
            'shop_moves': 'inventory_moves'
        };
        const inventoryType = inventoryTypeMap[shopType];
    
        // Get the current inventory and add the item
         // Add the item to the correct inventory
        let inventory = this.registry.get(inventoryType) || [];
        const newItem = { ...this.registry.get(shopType).find(item => item.key === key), quantity: 1 };
    
        // Update or add the item in inventory
        const existingItemIndex = inventory.findIndex(item => item.key === newItem.key);
        if (existingItemIndex !== -1) {
            inventory[existingItemIndex].quantity += 1; // Assumes items can be stacked
        } else {
            inventory.push(newItem);
        }
    
        // Update the registry with the new inventory and refresh display
        this.registry.set(inventoryType, inventory);
    
        // Refresh the inventory display for the current shop type
        this.updateShopDisplay(shopType); // Assuming this method also refreshes the visible inventory display
        this.updateEquippedText(); // Refresh wallet display
       // this.createScrollableInventory(); // Refresh inventory display
        
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

        this.updateShopDisplay(type); //refresh display
        this.updateEquippedText();
    }
}