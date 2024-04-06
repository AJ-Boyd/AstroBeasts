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

    src = 'mydatabase.db'
    dest = f'save_slot{slot}.db'
    
    # Ensure the source database exists
    if not os.path.exists(src):
        return jsonify({'status': 'error', 'message': 'Source database does not exist.'}), 404

    # Perform the copy operation
    print("before db created")
    shutil.copy(src, dest)
    print("db created")

    # Connect to the copied save slot database
    engine = create_engine(f'sqlite:///{dest}')
    Base.metadata.bind = engine
    Session = sessionmaker(bind=engine)
    session = Session()

    # For single player, you can directly work with the first (or only) player record
    player = session.query(Player).first()
    if not player:
        player = Player(name=gameState['playerName'])  # Assuming playerName is how you identify the current player
        session.add(player)
    else:
        player.name = gameState['playerName']  # Update player's name

    session.query(InventoryItem).delete()
    session.query(AstroBeast).delete()

    # Update player's inventory
    for item in gameState['inventory']:
        inventory_item = InventoryItem(name=item['name'], description=item['description'],
                                       quantity=item['quantity'], isEquipped=item['isEquipped'])
        session.add(inventory_item)  # Assuming a direct relationship without needing to append to player

    for beast in gameState['astrobeasts']:
        astro_beast = AstroBeast(name=beast['name'], description=beast['description'],
                                 isEquipped=beast['isEquipped'])
        session.add(astro_beast)
    
    session.commit()
    session.close()  # Make sure to close the session
    return jsonify({'status': 'success', 'message': f'Game saved successfully in slot {slot}.'})
