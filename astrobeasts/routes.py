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
from sqlalchemy.orm import scoped_session, sessionmaker
from .models import Base, engine
router = Blueprint("router", __name__)

def switch_db(db_filename):

    new_db_uri = f'sqlite:///{db_filename}'
    
    engine = create_engine(new_db_uri, echo=True, connect_args={"check_same_thread": False})
    

    Base.metadata.bind = engine
    
    Session = scoped_session(sessionmaker(autocommit=False,
                                          autoflush=False,
                                          bind=engine))
    
    
    Base.metadata.create_all(engine)  # Optional: Create tables if they don't exist
    return Session


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


@router.route('/switch_database', methods=['POST'])
def switch_database():
    data = request.get_json()

    db_filename = f"save_slot{str(data.get('slot'))}.db"

    if not os.path.exists(db_filename):
        return jsonify({'status': 'error', 'message': 'Database file does not exist.'}), 404

    new_session = switch_db(db_filename)

    return jsonify({'status': 'success', 'message': f'Database switched to {db_filename}.'})


