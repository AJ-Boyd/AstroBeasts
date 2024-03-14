"""
auth: AJ Boyd
date: 2/26/24
desc: this file hosts the different routes and endpoints in the flask application
file: routes.py
"""

from flask import Blueprint, render_template, request, jsonify
import sqlite3

router = Blueprint("router", __name__)


@router.route("/", methods=["GET", "POST"])
def start():
    """
    start()
    will render the start screen template with the appropriate data
    """
    return render_template("start_screen.html")


@router.route("/shop", methods=["GET", "POST"])
def shop():
    """
    start()
    will render the shop screen template with the appropriate data (shop's items)
    """
    return render_template("shop.html")
