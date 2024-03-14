"""
auth: AJ Boyd
date: 2/26/24
desc: initializes the databases and flask apps
file: init.py
"""

from flask import Flask
import sqlite3


def createApp():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "asdfasdfsadfSUPER-SECRET-keyyy!!!!"

    from .routes import router

    app.register_blueprint(router, url_prefix="/")
    return app
