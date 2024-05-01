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
from .models import Base, Player, InventoryItem, AstroBeast, Move, LeaderBoard
import json
import requests

router = Blueprint("router", __name__)
src = "mydatabase.db"
engine = create_engine(f"sqlite:///{src}")
Base.metadata.bind = engine
Session = sessionmaker(bind=engine)


@router.route("/", methods=["GET", "POST"])
def start():
    """
    start()
    will render the start screen template with the appropriate data
    """
    return render_template("game.html")


@router.route("/save_game", methods=["POST"])
def save_game():
    data = request.get_json()
    gameState = data['gameState']

    playerName = gameState.get('playerName')  # Safely get playerName, returns None if not found
    if not playerName:
        return jsonify({'status': 'error', 'message': 'Player name is required.'}), 400


    # Connect to the copied save slot database
    session = Session()

    player = session.query(Player).filter_by(name=playerName).first()
    if not player:
        player = Player(name=playerName)
        session.add(player)
    else:
        # If player exists, update their details but leave their unique inventory as is
        player.walletTotal = gameState.get('walletTotal', 0)
        player.Score = gameState.get('Score', 0)

        # Clear existing items but only for this player to avoid duplicates
        player.inventoryItems = []
        player.astroBeasts = []
        #player.inventoryMoves = []

    player.walletTotal = gameState.get('walletTotal', 0)
    player.Score = gameState.get('Score', 0)

    # Clear existing items and replace them
    session.query(InventoryItem).filter(InventoryItem.Player_Name == playerName).delete()
    session.query(AstroBeast).filter(AstroBeast.Player_Name == playerName).delete()
    session.query(Move).filter(Move.Player_Name == playerName).delete()

    # Inventory Items
    existing_items = {item.key: item for item in player.inventoryItems}
    for item_data in gameState.get('inventory_items', []):
        item = existing_items.get(item_data['key'])
        if item:
            item.quantity = item_data.get('quantity', 0)
            item.isEquipped = item_data.get('isEquipped', False)
        else:
            new_item = InventoryItem(
                Player_Name=playerName,
                name=item_data['name'],
                key=item_data['key'],
                description=item_data['description'],
                quantity=item_data.get('quantity', 0),
                isEquipped=item_data.get('isEquipped', False)
            )
            session.add(new_item)
    # AstroBeasts
    existing_beasts = {beast.key: beast for beast in player.astroBeasts}
    for beast_data in gameState.get('inventory_astrobeasts', []):
        beast = existing_beasts.get(beast_data['key'])
        if beast:
            beast.isEquipped = beast_data.get('isEquipped', False)
            beast.currentHP = beast_data.get('currentHP', 100)
        else:
            new_beast = AstroBeast(
                Player_Name=playerName,
                name=beast_data['name'],
                rarity = beast_data.get('rarity', 'Common'),
                currentExp =  beast_data.get('currentExp', 0),
                key=beast_data['key'],
                description=beast_data['description'],
                isEquipped=beast_data.get('isEquipped', False),
                maxHP=beast_data.get("maxHP", 100),
                currentHP=beast_data.get("currentHP", 100),
                stats=",".join(map(str, beast_data.get("stats", [100, 100, 100, 100]))),
                level=beast_data.get("level", 1),
                isAlive=beast_data.get("isAlive", True),
                quantity=beast_data.get('quantity', 0)
            )
            session.add(new_beast)

    # Moves
    for move_data in gameState.get('inventory_moves', []):
        move = Move(
            Player_Name=playerName,
            name=move_data['name'],
            key=move_data['key'],
            description=move_data['description'],
            quantity=move_data.get('quantity', 1),
            cost=move_data.get('cost', 0),
            isEquipped=move_data.get('isEquipped', False)
        )
        session.add(move)  # Add moves to session directly

    session.commit()
    session.close()
    return jsonify({'status': 'success', 'message': 'Game saved successfully!'})



@router.route("/check_name", methods=["POST"])
def check_name():
    data = request.get_json()
    player_name = data["name"]

    session = Session()
    session.flush()
    player = session.query(Player).filter_by(name=player_name).first()
    if player:
        inventory_items = (
            session.query(InventoryItem)
            .filter(InventoryItem.Player_Name == player_name)
            .all()
        )
        myBeasts = (
            session.query(AstroBeast)
            .filter(AstroBeast.Player_Name == player_name)
            .all()
        )
        myMoves = session.query(Move).filter(Move.Player_Name == player_name).all()
        player_data = {
            "walletTotal": player.walletTotal,
            "playerName": player.name,
            "Score": player.Score,
            "Level": player.Level,
            "inventory_items": [
                {
                    "name": item.name,
                    "description": item.description,
                    "quantity": item.quantity,
                    "isEquipped": item.isEquipped,
                    "key": item.key,
                }
                for item in inventory_items
            ],
            "inventory_astrobeasts": [
                {
                    "name": beast.name,
                    "description": beast.description,
                    "isEquipped": beast.isEquipped,
                    "key": beast.key,
                    "maxHP": beast.maxHP,
                    "currentHP": beast.currentHP,
                    "rarity" : beast.rarity,
                    "currentExp" :  beast.currentExp,
                    "stats": list(map(int, beast.stats.split(","))),
                    "level": beast.level,
                    "quantity": beast.quantity,
                    "isAlive": beast.isAlive,
                }
                for beast in myBeasts
            ],
            "inventory_moves": [
                {
                    "name": move.name,
                    "description": move.description,
                    "quantity": move.quantity,
                    "cost": move.cost,
                    "isEquipped": move.isEquipped,
                    "key": move.key,
                }
                for move in myMoves
            ],
        }
        # If a player with the given name exists
        return jsonify(
            {
                "exists": True,
                "message": f"Player {player_name} exists.",
                "playerData": player_data,
            }
        )
    else:
        # If no player with the given name exists
        return jsonify(
            {"exists": False, "message": f"Player {player_name} does not exist."}
        )
    
@router.route('/get_high_scores', methods=['GET'])
def get_high_scores():
    session = Session()
    top_players = session.query(Player).order_by(Player.Score.desc()).limit(5).all()
    scores = [{'name': player.name, 'score': player.Score} for player in top_players]
    return jsonify(scores)


@router.route("/submit_scores", methods=["POST"])
def submit_scores():
    session = Session()
    top_players = session.query(Player).order_by(Player.Score.desc()).limit(5).all()
    data = {
        "data": [
            {
                "Group": "Russian-Blue",
                "Title": "Top 5 Scores",
            }
        ]
    }
    for idx, player in enumerate(top_players, 1):
        ordinal = {1: "1st", 2: "2nd", 3: "3rd", 4: "4th", 5: "5th"}.get(
            idx, f"{idx}th"
        )
        data["data"][0][f"{ordinal} Name"] = player.name
        data["data"][0][f"{ordinal} Score"] = player.Score

    response = requests.post("https://eope3o6d7z7e2cc.m.pipedream.net", json=data)
    if response.status_code == 200:
        return jsonify(
            {"status": "success", "message": "Scores submitted successfully!"}
        )
    else:
        return jsonify({"status": "error", "message": "Failed to submit scores."}), 400
