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
    gameState = data["gameState"]

    playerName = gameState.get(
        "playerName"
    )  # Safely get playerName, returns None if not found
    if not playerName:
        return jsonify({"status": "error", "message": "Player name is required."}), 400

    # Connect to the copied save slot database
    session = Session()

    player = session.query(Player).filter_by(name=playerName).first()
    if not player:
        player = Player(name=playerName)
        session.add(player)
    else:
        player.name = playerName  # Update player's name
        player.walletTotal = gameState.get("walletTotal", 0)
        player.Score = gameState.get("Score", 0)

    session.query(InventoryItem).filter_by(Player_Name=playerName).delete()
    session.query(AstroBeast).delete()
    session.query(Move).delete()

    for item in gameState.get("inventory_items", []):
        inventory_item = InventoryItem(
            Player_Name=playerName,  # Link by name
            name=item["name"],
            key=item["key"],
            description=item["description"],
            quantity=item.get("quantity", 0),
            isEquipped=item.get("isEquipped", False),
        )
        session.add(inventory_item)

    for beast in gameState.get("inventory_astrobeasts", []):
        astro_beast = AstroBeast(
            Player_Name=playerName,
            name=beast["name"],
            key=beast["key"],
            description=beast["description"],
            isEquipped=beast.get("isEquipped", False),  # Safely get isEquipped
            maxHP=beast.get("maxHP", 100),
            currentHP=beast.get("currentHP", beast.get("maxHP", 100)),
            stats=",".join(
                map(str, beast.get("stats", [100, 100, 100, 100]))
            ),  # Storing stats as a comma-separated string or JSON could be an option
            level=beast.get("level", 1),
            isAlive=beast.get("isAlive", True),
            assetAnim="idle_" + (beast["name"].strip()),
        )
        session.add(astro_beast)
    # print(gameState.get('inventory_moves'))
    for move in gameState.get("inventory_moves", []):
        move_entry = Move(
            Player_Name=playerName,
            name=move["name"],
            key=move["key"],
            description=move["description"],
            quantity=move.get("quantity", 1),  # Default to 1 if not provided
            cost=move.get("cost", 0),  # Default to 0 if not provided
            isEquipped=move.get("isEquipped", False),  # Safely get isEquipped
        )
        session.add(move_entry)

    session.commit()
    session.close()  # Make sure to close the session
    return jsonify({"status": "success", "message": "save successful!"})


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
                    "stats": list(map(int, beast.stats.split(","))),
                    "level": beast.level,
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
