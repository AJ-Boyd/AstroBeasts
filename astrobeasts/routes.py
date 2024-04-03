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
    
    return jsonify({'status': 'success', 'message': f'Game saved successfully in slot {slot}.'})
