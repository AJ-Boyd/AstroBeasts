"""
auth: AJ Boyd
date: 2/26/24
desc: this file hosts the different routes and endpoints in the flask application
file: routes.py
"""

from flask import Blueprint, render_template, request, jsonify
import sqlite3
import shutil
from flask import Flask, request, jsonify
import os
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base, Player, InventoryItem, AstroBeast

router = Blueprint("router", __name__)
src = 'mydatabase.db'
engine = create_engine(f'sqlite:///{src}')
Base.metadata.bind = engine
Session = sessionmaker(bind=engine)

@router.route("/", methods=["GET", "POST"])
def start():
    """
    start()
    will render the start screen template with the appropriate data
    """
    return render_template("game.html")

@router.route('/save_game', methods=['POST'])
def save_game():
    data = request.get_json()
    slot = data.get('slot')
    gameState = data['gameState']
    if slot not in ['1', '2', '3']:
        return jsonify({'status': 'error', 'message': 'Invalid save slot.'}), 400

    dest = f'save_slot{slot}.db'
    
    # Ensure the source database exists
    if not os.path.exists(src):
        return jsonify({'status': 'error', 'message': 'Source database does not exist.'}), 404

    # Perform the copy operation
    #print("before db created")
    #shutil.copy(src, dest)
    #print("db created")

    playerName = gameState.get('playerName')  # Safely get playerName, returns None if not found
    if not playerName:
        return jsonify({'status': 'error', 'message': 'Player name is required.'}), 400


    # Connect to the copied save slot database
    session = Session()

    # For single player, you can directly work with the first (or only) player record
    player = session.query(Player).first()
    if not player:
        player = Player(name=playerName)
        session.add(player)
    else:
        player.name = playerName  # Update player's name

    session.query(InventoryItem).delete()
    session.query(AstroBeast).delete()

    for item in gameState.get('inventory_items', []):  # Safe iteration
        inventory_item = InventoryItem(
            name=item['name'], 
            description=item['description'],
            quantity=item.get('quantity', 0),  # Use the safely gotten quantity
            isEquipped=item.get('isEquipped', False)  # Use the safely gotten isEquipped
        )
        session.add(inventory_item)

    for beast in gameState.get('inventory_astrobeasts', []):
        astro_beast = AstroBeast(
            name=beast['name'], 
            description=beast['description'],
            isEquipped=beast.get('isEquipped', False)  # Safely get isEquipped
        )
        session.add(astro_beast)
    
    
    session.commit()
    session.close()  # Make sure to close the session
    return jsonify({'status': 'success', 'message': f'Game saved successfully in slot {slot}.'})

@router.route('/check_name', methods=['POST'])
def check_name():
    data = request.get_json()
    player_name = data['name']

    session = Session()
    player = session.query(Player).filter_by(name=player_name).first()
    if player:
        player_data = {
            'playerName': player.name,
            'inventory_items': [{'name': item.name, 'description': item.description, 'quantity': item.quantity, 'isEquipped': item.isEquipped} for item in player.inventoryItems],
            'inventory_astrobeasts': [{'name': beast.name, 'description': beast.description, 'isEquipped': beast.isEquipped} for beast in player.astroBeasts],
        }
        # If a player with the given name exists
        return jsonify({'exists': True, 'message': f'Player {player_name} exists.', 'playerData': player_data})
    else:
        # If no player with the given name exists
        return jsonify({'exists': False, 'message': f'Player {player_name} does not exist.'})
